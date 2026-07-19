export function serializeAttachmentHTML(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  div.querySelectorAll('img[data-filename]').forEach(function(img) {
    img.setAttribute('src', img.getAttribute('data-filename'));
    img.removeAttribute('data-filename');
  });
  return div.innerHTML;
}

export function buildAttachmentUrlMap(textarea) {
  var map = {};
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
    if (!filename || !attachmentId) return;

    map[filename] = {
      url: '/attachments/download/' + attachmentId + '/' + encodeURIComponent(filename),
      id: attachmentId,
    };
  });

  return map;
}

export function resolveAttachmentSrcs(html, urlMap) {
  var div = document.createElement('div');
  div.innerHTML = html;
  div.querySelectorAll('img[src]').forEach(function(img) {
    var src = img.getAttribute('src');
    if (urlMap[src]) {
      img.setAttribute('data-filename', src);
      img.setAttribute('src', urlMap[src].url);
    }
  });
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
