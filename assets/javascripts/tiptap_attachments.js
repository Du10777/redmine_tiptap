import { protectMacros, restoreMacros, flattenTableExtras, convertSpecialContainers } from './tiptap_legacy.js';
import { inertElement } from './tiptap_inert.js';

// The HTML of the editor as it is stored. format, if given, reshapes the HTML
// (the source mode puts line breaks into it) without touching the macros: they
// are put back as text only after that. Built in an element that loads nothing:
// here a picture gets the bare file name of its attachment as its address.
export function serializeAttachmentHTML(html, format) {
  var div = inertElement();
  div.innerHTML = html;
  div.querySelectorAll('img[data-filename]').forEach(function(img) {
    img.setAttribute('src', img.getAttribute('data-filename'));
    img.removeAttribute('data-filename');
  });
  return restoreMacros(div, format);
}

// A collapsible block is <details>; it is open while edited (open="true", which the
// serializer writes as <details open="">) and collapsed when stored, so the open flag
// is dropped before the HTML is saved.
export function collapseDetailsOpen(html) {
  return html.replace(/<details open="">/g, '<details>');
}

// The attachments a text of this form can show by file name: the ones of what the page
// shows (the issue, the wiki page...), from the server (window.TiptapAttachments, see
// hooks.rb), so also in the form that edits a note, which lists no attachments. The form
// of an issue lists them too (#existing-attachments): what is missing above comes from
// there. A map without a prototype: a file name is only a key.
export function buildAttachmentUrlMap(textarea) {
  var map = Object.create(null);
  var known = window.TiptapAttachments || {};
  Object.keys(known).forEach(function(filename) {
    var entry = known[filename];
    map[filename] = { url: entry.url, id: String(entry.id), thumbnail: entry.thumbnail };
  });

  var form = textarea.closest('form');
  if (!form) return map;

  var existingBlock = form.querySelector('#existing-attachments');
  if (!existingBlock) return map;

  existingBlock.querySelectorAll('.existing-attachment').forEach(function(span) {
    var filenameInput = span.querySelector('input.filename');
    var deleteCheckbox = span.querySelector('input.deleted_attachment');
    if (!filenameInput || !deleteCheckbox) return;

    var filename = filenameInput.value;
    var attachmentId = deleteCheckbox.value;
    if (!filename || !attachmentId || map[filename]) return;

    map[filename] = {
      url: '/attachments/download/' + attachmentId + '/' + encodeURIComponent(filename),
      id: attachmentId,
    };
  });

  return map;
}

// The stored text as the editor takes it: attachment names become addresses, and
// what a text of CKEditor has that the editor's schema lacks is made ready (macros
// are protected before the HTML is parsed: their bodies are not HTML a parser may
// touch). In an element that loads nothing: the stored text gives a picture by the
// bare file name of its attachment, before it is replaced here by its address.
export function resolveAttachmentSrcs(html, urlMap) {
  var div = inertElement();
  div.innerHTML = protectMacros(html);
  div.querySelectorAll('img[src]').forEach(function(img) {
    var src = img.getAttribute('src');
    if (urlMap[src]) {
      img.setAttribute('data-filename', src);
      img.setAttribute('src', urlMap[src].url);
    }
  });
  flattenTableExtras(div);
  convertSpecialContainers(div);
  return div.innerHTML;
}

export function makeClipboardFilename(originalName) {
  var date = new Date();
  var pad = function(n) { return ('0' + n).slice(-2); };
  return 'clipboard-'
    + date.getFullYear()
    + pad(date.getMonth() + 1)
    + pad(date.getDate())
    + pad(date.getHours())
    + pad(date.getMinutes())
    + '-' + Math.random().toString(36).slice(2, 7)
    + '.' + (originalName.split('.').pop() || 'png');
}

export function setupImagePaste(editorDiv, editor, textarea) {
  editorDiv.addEventListener('paste', function(e) {
    var clipboardData = e.clipboardData;
    if (!clipboardData) return;

    var items = Array.prototype.slice.call(clipboardData.items || []);
    var imageFiles = items
      .filter(function(item) { return item.kind === 'file' && item.type.indexOf('image') !== -1; })
      .map(function(item) { return item.getAsFile(); })
      .filter(Boolean);

    if (imageFiles.length === 0) return;
    // A picture copied in an editor (see setupImageCopy): the editor's own HTML is on
    // the clipboard with it, and ProseMirror has pasted that already - the picture of
    // the same attachment, which is not to be uploaded once more.
    if ((clipboardData.getData('text/html') || '').indexOf('data-pm-slice') !== -1) return;
    e.preventDefault();

    var form = textarea.closest('form');
    if (!form) return;
    var inputEl = form.querySelector('input[type=file].filedrop');
    if (!inputEl) return;

    imageFiles.forEach(function(file) {
      var filename = makeClipboardFilename(file.name || 'image.png');
      var namedFile = new File([file], filename, { type: file.type });

      window._tiptapActiveEditor = editor;
      window._tiptapActiveTextarea = textarea;
      window.handleFileDropEvent.target = textarea;
      window.addFile($(inputEl), namedFile, true);
    });
  });
}

// Ctrl+C on a selected picture puts the picture itself on the clipboard, as the
// browser's "Copy image" does: another program (a messenger, a graphics editor)
// pastes it as a picture. With it goes the HTML that ProseMirror has just put there,
// so that pasted into an editor it is the same attachment again (see setupImagePaste).
// A page may put a picture on the clipboard only on HTTPS (and on localhost), and only
// a picture it can read (of this site): anywhere else the picture is copied as HTML,
// as before.
export function setupImageCopy(editorDiv, editor) {
  if (!window.isSecureContext || typeof window.ClipboardItem !== 'function'
      || !navigator.clipboard || !navigator.clipboard.write) return;

  // In the bubble phase: ProseMirror has put its HTML on the clipboard by now.
  editorDiv.addEventListener('copy', function(e) {
    var selection = editor.state.selection;
    if (!selection.node || selection.node.type.name !== 'image' || !e.clipboardData) return;
    var dom = editor.view.nodeDOM(selection.from);
    var img = dom && dom.querySelector ? dom.querySelector('img') : null;
    if (!img || !img.complete || !img.naturalWidth || !readablePicture(img.src)) return;

    var item = { 'image/png': pictureAsPng(img) };
    var html = e.clipboardData.getData('text/html');
    if (html) item['text/html'] = new Blob([html], { type: 'text/html' });
    navigator.clipboard.write([new window.ClipboardItem(item)]).catch(function() {
      // not allowed by the browser: the HTML of the picture stays on the clipboard
    });
  });
}

// A picture the page may draw on a canvas: one of this site, or one made by the page
// itself (a picture just pasted is shown from a blob: address until it is saved).
function readablePicture(src) {
  try {
    var url = new URL(src, window.location.href);
    return url.origin === window.location.origin || url.protocol === 'blob:' || url.protocol === 'data:';
  } catch (e) {
    return false;
  }
}

// The picture in its own size as PNG, the format of pictures on the clipboard.
function pictureAsPng(img) {
  return new Promise(function(resolve, reject) {
    var canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext('2d').drawImage(img, 0, 0);
    canvas.toBlob(function(blob) {
      if (blob) resolve(blob); else reject(new Error('The picture could not be made PNG'));
    }, 'image/png');
  });
}

export function setupFileInputBinding(textarea, editor) {
  var form = textarea.closest('form');
  if (!form) return;

  var inputEl = form.querySelector('input[type=file].filedrop');
  if (!inputEl) return;

  var bindActive = function() {
    window._tiptapActiveEditor = editor;
    window._tiptapActiveTextarea = textarea;
  };

  inputEl.addEventListener('change', bindActive, true);

  var dropZone = inputEl.closest('.filedroplistner') || inputEl.closest('.box');
  if (dropZone) dropZone.addEventListener('drop', bindActive, true);
}

export function patchAddInlineAttachmentMarkup() {
  if (typeof window.addInlineAttachmentMarkup !== 'function') return;
  if (window.addInlineAttachmentMarkup._tiptapPatched) return;

  var original = window.addInlineAttachmentMarkup;

  var patched = function(file) {
    var activeEditor = window._tiptapActiveEditor;
    var isImage = window.wikiImageMimeTypes && window.wikiImageMimeTypes.indexOf(file.type) > -1;

    if (activeEditor && isImage && document.body.getAttribute('data-text-formatting') === 'tiptap') {
      var sanitizedFilename = file.name.replace(/[\/\?\%\*\:\|\"\'<>\n\r]+/g, '_');
      var blobUrl = URL.createObjectURL(file);

      var activeTextarea = window._tiptapActiveTextarea;
      if (activeTextarea && activeTextarea._tiptapUrlMap) {
        activeTextarea._tiptapUrlMap[sanitizedFilename] = { url: blobUrl, id: null };
      }

      activeEditor.chain().focus().setImage({
        src: blobUrl,
        alt: sanitizedFilename,
        filename: sanitizedFilename,
      }).run();
      return;
    }

    return original(file);
  };

  patched._tiptapPatched = true;
  window.addInlineAttachmentMarkup = patched;
}
