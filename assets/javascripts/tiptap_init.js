import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

import {
  Image, CollapsibleBlock, CollapsibleSummary, CollapsibleContent,
  TextStyle, Color, FontFamily, FontSize, BackgroundColor,
  QuoteBlock, QuoteHeader, QuoteBody,
  StyledBulletList, StyledOrderedList, TaskList, TaskItem,
  Underline, TextAlign, Link, Indent,
  Table, TableRow, TableHeader, TableCell,
  FormattableCodeBlock,
} from './tiptap_extensions.js';
import { buildToolbar } from './tiptap_toolbar.js';
import { highlightSavedCodeBlocks } from './tiptap_codeblock.js';
import { setupTableContextMenu } from './tiptap_table_menu.js';
import { setupTablePaste, setupSavedTableCopy } from './tiptap_table_paste.js';
import {
  serializeAttachmentHTML,
  buildAttachmentUrlMap,
  resolveAttachmentSrcs,
  setupImagePaste,
  setupFileInputBinding,
  patchAddInlineAttachmentMarkup,
} from './tiptap_attachments.js';

// --- Limiting the height of the editing area --------------------------------
// Without a limit the editor grows to fit the text: the toolbar goes up past the
// edge of the screen, and the form buttons ("Save"/"Cancel") go down. We compute
// how much vertical space is really left and enable scrolling inside the area.
// Everything is in CSS pixels, so changing the page zoom (Ctrl +/-) by itself gives
// more or less available height - recalculating on resize is enough.

var MIN_EDITOR_HEIGHT = 160;     // never go below this, even on a short screen
var FALLBACK_BELOW = 220;        // room for the buttons if the form could not be found
var EDITOR_GAP = 16;             // a small gap so the buttons do not stick to the edge
var MIN_VIEWPORT_RATIO = 0.45;   // never make the editor smaller than this share of the screen
var STICKY_FALLBACK = 50;        // Redmine's own header compensation is scroll-margin-top: 50px

// The sticky issue header (#sticky-issue-header) is position: fixed on top of the
// page: it does not shift the layout but covers the top of the window. Room for it
// is always reserved, even while it is hidden - it appears as soon as the page is
// scrolled to the form, and would otherwise hide the editor toolbar beneath it.
function topOverlayHeight() {
  var bar = document.getElementById('sticky-issue-header');
  if (!bar) return 0;
  var h = bar.getBoundingClientRect().height;
  return h > 0 ? h : STICKY_FALLBACK;
}

// The form buttons ("Save"/"Create") that the editor has to "reach".
function submitAnchor(wrapper) {
  var form = wrapper.closest('form');
  if (!form) return null;
  return form.querySelector('input[type="submit"], button[type="submit"]')
    || form.querySelector('.buttons');
}

function applyMaxHeight(wrapper) {
  // A size set with the grip takes priority over auto-sizing.
  if (wrapper._tiptapManualHeight) return;

  // A hidden editor (the issue edit form before it is expanded) has all sizes at
  // zero - there is nothing to measure. Keep the fallback value from CSS and
  // recalculate once the editor shows up on screen.
  if (wrapper.getClientRects().length === 0) return;

  var content = wrapper.querySelector('.tiptap-content');
  var toolbar = wrapper.querySelector('.tiptap-toolbar');
  if (!content || !toolbar) return;

  // How much vertical space we claim: the window minus the strip covered at the top.
  var target = window.innerHeight - topOverlayHeight() - EDITOR_GAP;
  var anchorEl = submitAnchor(wrapper);
  var avail;

  if (anchorEl) {
    // We do not model the form layout but measure it as it is: how much space is now
    // taken by everything from the top of the toolbar to the bottom of the buttons.
    // Shrinking the editing area by N pixels raises the buttons by exactly as much, so
    // the needed height is obtained with a single arithmetic correction - regardless
    // of what else is on the form.
    var span = anchorEl.getBoundingClientRect().bottom - toolbar.getBoundingClientRect().top;
    avail = content.getBoundingClientRect().height - (span - target);
  } else {
    avail = target - toolbar.offsetHeight - FALLBACK_BELOW;
  }

  // On forms with a lot more below the editor (issue edit: the description is
  // followed by the attributes and the notes editor), "reaching the buttons" would
  // mean collapsing the editor almost to zero. We do not go below this fraction of
  // the screen.
  var floorH = window.innerHeight * MIN_VIEWPORT_RATIO;
  if (avail < floorH) avail = floorH;
  if (avail < MIN_EDITOR_HEIGHT) avail = MIN_EDITOR_HEIGHT;

  wrapper.style.setProperty('--tiptap-max-height', Math.round(avail) + 'px');
}

// The editor may be created hidden (the issue edit form is expanded later).
// display:none produces no childList mutations, so we catch the moment it appears
// via ResizeObserver and compute the height only on the "hidden -> visible"
// transition - this way the recalculation does not loop on its own size changes.
var sizeObserver = window.ResizeObserver
  ? new window.ResizeObserver(function(entries) {
      entries.forEach(function(entry) {
        var wrapper = entry.target;
        var visible = entry.contentRect.height > 0 || entry.contentRect.width > 0;
        if (!visible) {
          wrapper._tiptapHidden = true;
        } else if (wrapper._tiptapHidden) {
          wrapper._tiptapHidden = false;
          applyMaxHeight(wrapper);
        }
      });
    })
  : null;

function watchVisibility(wrapper) {
  if (!sizeObserver) return;
  wrapper._tiptapHidden = wrapper.getClientRects().length === 0;
  sizeObserver.observe(wrapper);
}

var maxHeightPending = false;
function refreshMaxHeights() {
  if (maxHeightPending) return;
  maxHeightPending = true;
  window.requestAnimationFrame(function() {
    maxHeightPending = false;
    document.querySelectorAll('.tiptap-wrapper').forEach(applyMaxHeight);
  });
}

// --- Resize grip -------------------------------------------------------------
// Auto-sizing the height does not suit everyone or every case, so the user can drag
// the bottom-right corner of the editing area with the mouse. The chosen height is
// remembered and applied to all editors; double-clicking the grip restores auto mode.

var HEIGHT_STORAGE_KEY = 'redmineTiptapEditorHeight';

function readStoredHeight() {
  try {
    var value = parseInt(window.localStorage.getItem(HEIGHT_STORAGE_KEY), 10);
    return value > 0 ? value : 0;
  } catch (e) {
    return 0;   // localStorage may be unavailable (private mode, policy)
  }
}

function writeStoredHeight(height) {
  try {
    if (height) {
      window.localStorage.setItem(HEIGHT_STORAGE_KEY, String(height));
    } else {
      window.localStorage.removeItem(HEIGHT_STORAGE_KEY);
    }
  } catch (e) { /* not critical: the size just won't survive a reload */ }
}

function setManualHeight(wrapper, height) {
  wrapper._tiptapManualHeight = height;
  wrapper.style.setProperty('--tiptap-height', height + 'px');
  wrapper.style.setProperty('--tiptap-max-height', height + 'px');
}

function clearManualHeight(wrapper) {
  wrapper._tiptapManualHeight = 0;
  wrapper.style.removeProperty('--tiptap-height');
  applyMaxHeight(wrapper);
}

function buildResizer(wrapper) {
  var grip = document.createElement('div');
  grip.className = 'tiptap-resizer';
  grip.title = 'Потянуть — изменить высоту редактора, двойной клик — вернуть автоматическую';

  grip.addEventListener('pointerdown', function(event) {
    event.preventDefault();

    // The user may be dragging either of the two areas - measure from the visible one.
    var box = wrapper.querySelector('.tiptap-content');
    var source = wrapper.querySelector('.tiptap-source');
    if (source && source.style.display !== 'none') box = source;

    var startY = event.clientY;
    var startHeight = box.getBoundingClientRect().height;

    function onMove(moveEvent) {
      var height = Math.round(startHeight + (moveEvent.clientY - startY));
      if (height < MIN_EDITOR_HEIGHT) height = MIN_EDITOR_HEIGHT;
      setManualHeight(wrapper, height);
    }

    function onUp() {
      grip.removeEventListener('pointermove', onMove);
      grip.removeEventListener('pointerup', onUp);
      grip.removeEventListener('pointercancel', onUp);
      writeStoredHeight(wrapper._tiptapManualHeight);
    }

    // Pointer capture: events reach the grip even if the cursor moves past its edge.
    grip.setPointerCapture(event.pointerId);
    grip.addEventListener('pointermove', onMove);
    grip.addEventListener('pointerup', onUp);
    grip.addEventListener('pointercancel', onUp);
  });

  grip.addEventListener('dblclick', function(event) {
    event.preventDefault();
    writeStoredHeight(0);
    document.querySelectorAll('.tiptap-wrapper').forEach(clearManualHeight);
  });

  return grip;
}

function initTextarea(textarea) {
  if (textarea.dataset.tiptapInit) return;
  textarea.dataset.tiptapInit = '1';

  var wrapper = document.createElement('div');
  wrapper.className = 'tiptap-wrapper';

  var editorDiv = document.createElement('div');
  editorDiv.className = 'tiptap-content';

  var sourceDiv = document.createElement('textarea');
  sourceDiv.className = 'tiptap-source';
  sourceDiv.style.display = 'none';

  wrapper.appendChild(editorDiv);
  wrapper.appendChild(sourceDiv);

  var jstBlock = textarea.closest('.jstBlock');
  if (jstBlock) {
    jstBlock.parentNode.insertBefore(wrapper, jstBlock.nextSibling);
    jstBlock.style.display = 'none';
  } else {
    textarea.parentNode.insertBefore(wrapper, textarea);
    textarea.style.display = 'none';
  }

  var urlMap = buildAttachmentUrlMap(textarea);
  textarea._tiptapUrlMap = urlMap;

  var initialContent = resolveAttachmentSrcs(
    (textarea.value || '')
      .replace(/<details>/g, '<details open="true">')
      .replace(/<pre><code([^>]*)>\n/g, '<pre><code$1>')
      .replace(/\n<\/code><\/pre>/g, '</code></pre>'),
    urlMap
  );

  var editor = new Editor({
    element: editorDiv,
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        link: false,
        underline: false,
        codeBlock: false,
      }),
      FormattableCodeBlock,
      StyledBulletList,
      StyledOrderedList,
      TaskList,
      TaskItem.configure({ nested: true }),
      Image,
      CollapsibleBlock, CollapsibleSummary, CollapsibleContent,
      QuoteBlock, QuoteHeader, QuoteBody,
      TextStyle,
      Color,
      FontFamily,
      FontSize,
      BackgroundColor,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({
        openOnClick: false,
        autolink: false,
        HTMLAttributes: {
          target: null,
          rel: null,
        },
      }),
      Indent,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: '',
    onUpdate: function(props) {
      // No line breaks are added around the code block content: after <code> the
      // browser does not drop them (unlike <pre>), and in view mode they turned
      // into an empty line above and below the block.
      textarea.value = serializeAttachmentHTML(props.editor.getHTML())
        .replace(/<details open="">/g, '<details>');
    },
  });

  editor.commands.setContent(initialContent);

  editor.on('focus', function() {
    window._tiptapActiveEditor = editor;
  });

  var form = textarea.closest('form');
  if (form) {
    form.addEventListener('submit', function() {
      textarea.value = textarea.value.replace(/<details open="">/g, '<details>');
    });
  }

  sourceDiv.addEventListener('input', function() {
    textarea.value = sourceDiv.value;
  });

  var toolbar = buildToolbar(editor, editorDiv, sourceDiv, urlMap);
  wrapper.insertBefore(toolbar, editorDiv);

  setupTablePaste(editorDiv, editor);
  setupImagePaste(editorDiv, editor, textarea);
  setupFileInputBinding(textarea, editor);
  setupTableContextMenu(editorDiv, editor);

  wrapper.appendChild(buildResizer(wrapper));

  var stored = readStoredHeight();
  if (stored) {
    setManualHeight(wrapper, stored);
  } else {
    applyMaxHeight(wrapper);
  }
  watchVisibility(wrapper);

  // The editor was created for a field that already had the cursor (Redmine
  // itself focuses the field when expanding the form) - move focus into the editor.
  if (document.activeElement === textarea) editor.commands.focus('end');
}

// --- Lazy editor creation ----------------------------------------------------
// On the issue page the description and notes editors sit in the hidden edit form.
// Creating them right away means parsing and highlighting the whole description
// every time, even if the user is only reading (on an issue with a 3000-line log
// that is about 0.4 s on a fast PC). So a hidden field is left untouched until the
// form appears on screen: ResizeObserver reports when the field gets a size.
// Until there is an editor, the form submits the field's original text unchanged.
var pendingFieldObserver = window.ResizeObserver
  ? new window.ResizeObserver(function(entries) {
      entries.forEach(function(entry) {
        var textarea = entry.target;
        if (entry.contentRect.width === 0 && entry.contentRect.height === 0) return;
        pendingFieldObserver.unobserve(textarea);
        delete textarea.dataset.tiptapPending;
        initTextarea(textarea);
      });
    })
  : null;

function initWhenVisible(textarea) {
  if (textarea.dataset.tiptapInit || textarea.dataset.tiptapPending) return;
  if (!pendingFieldObserver || textarea.getClientRects().length > 0) {
    initTextarea(textarea);
    return;
  }
  textarea.dataset.tiptapPending = '1';
  pendingFieldObserver.observe(textarea);
}

function scanAndInit() {
  if (document.body.getAttribute('data-text-formatting') !== 'tiptap') return;
  patchAddInlineAttachmentMarkup();
  document.querySelectorAll('textarea.wiki-edit').forEach(initWhenVisible);
}

function setupSavedTaskList() {
  // On view pages (not in the editor), make task checkboxes non-clickable
  // and reflect their state from data-checked.
  document.querySelectorAll('ul[data-type="taskList"] li').forEach(function(li) {
    if (li.closest('.ProseMirror')) return;
    var input = li.querySelector('input[type="checkbox"]');
    if (!input) return;
    input.disabled = true;
    input.checked = li.getAttribute('data-checked') === 'true';
  });
}

function boot() {
  scanAndInit();
  setupSavedTableCopy();
  setupSavedTaskList();
  highlightSavedCodeBlocks();
  var observer = new MutationObserver(function(mutations) {
    // Typing and toolbar redraws change the DOM only inside the editor itself and
    // do not touch the page structure: no new fields, no new code blocks in view
    // mode, no reason to recalculate the height. Without this check every keystroke
    // forced the browser to lay out the whole page again - on a large document that
    // is hundreds of milliseconds.
    var outsideEditors = mutations.some(function(mutation) {
      var el = mutation.target.nodeType === 1 ? mutation.target : mutation.target.parentElement;
      return !(el && el.closest && el.closest('.tiptap-wrapper, .tiptap-lang-panel'));
    });
    if (!outsideEditors) return;
    scanAndInit();
    setupSavedTaskList();
    highlightSavedCodeBlocks();
    refreshMaxHeights();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // resize also fires when the page zoom changes (Ctrl +/-):
  // window.innerHeight is in CSS pixels, so when zooming out
  // the available editor height automatically becomes larger.
  window.addEventListener('resize', refreshMaxHeights);
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', refreshMaxHeights);
  }

  // The editor may have been hidden when it was created (the issue edit form
  // opens via a button) - by the time it gets focus, the sizes are real.
  document.addEventListener('focusin', function(e) {
    if (e.target.closest && e.target.closest('.tiptap-wrapper')) refreshMaxHeights();
  });
}

// The bundle is included from <head>, so by the time it runs document.body
// may not exist yet - wait for the DOM to be ready.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
