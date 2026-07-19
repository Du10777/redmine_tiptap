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
      textarea.value = serializeAttachmentHTML(props.editor.getHTML())
        .replace(/<details open="">/g, '<details>')
        .replace(/<pre><code([^>]*)>/g, '<pre><code$1>\n')
        .replace(/<\/code><\/pre>/g, '\n</code></pre>');
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
}

function scanAndInit() {
  if (document.body.getAttribute('data-text-formatting') !== 'tiptap') return;
  patchAddInlineAttachmentMarkup();
  document.querySelectorAll('textarea.wiki-edit').forEach(initTextarea);
}

function setupSavedTaskList() {
  // На страницах просмотра (не в редакторе) делаем чекбоксы задач
  // некликабельными и отражаем их состояние из data-checked.
  document.querySelectorAll('ul[data-type="taskList"] li').forEach(function(li) {
    if (li.closest('.ProseMirror')) return;
    var input = li.querySelector('input[type="checkbox"]');
    if (!input) return;
    input.disabled = true;
    input.checked = li.getAttribute('data-checked') === 'true';
  });
}

scanAndInit();
setupSavedTableCopy();
setupSavedTaskList();
var observer = new MutationObserver(function() {
  scanAndInit();
  setupSavedTaskList();
});
observer.observe(document.body, { childList: true, subtree: true });
