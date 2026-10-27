import { t } from './tiptap_i18n.js';

var MAX_TABLE_SIZE = 50;   // rows or columns of a table inserted with the dialog

// A dialog takes the focus from the editor while it is open: Enter and the other keys go
// to the dialog's own keydown listener, not into the text under it as well. Given now and
// once more in the next frame: a focus of the editor still pending (TipTap's focus()
// runs in requestAnimationFrame) took it back to the editor otherwise.
function focusDialog(el, select) {
  function give() {
    if (!el.isConnected) return;
    el.focus();
    if (select) el.select();
  }
  if (el.tabIndex < 0 && !/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(el.tagName)) el.tabIndex = -1;
  give();
  window.requestAnimationFrame(give);
}

function isImageFilename(filename) {
  return /\.(png|jpe?g|gif|webp|svg|bmp)$/i.test(filename);
}

function sortedNames(names) {
  return names.slice().sort(function(a, b) { return a.localeCompare(b); });
}

function makeModalHeader(title, onClose) {
  var header = document.createElement('div');
  header.className = 'tiptap-modal-header';
  var titleEl = document.createElement('span');
  titleEl.textContent = title;
  header.appendChild(titleEl);

  var closeBtn = document.createElement('button');
  closeBtn.className = 'tiptap-modal-close';
  closeBtn.type = 'button';
  closeBtn.textContent = '×';
  closeBtn.addEventListener('click', onClose);
  header.appendChild(closeBtn);
  return header;
}

// A dialog box over the page, the frame all the dialogs share: Escape, the x and a click
// beside the box close it; onKey gets the other keys while it is open. Its content goes
// into .modal (after the header); show() puts it on the page and gives the focus to
// focusTarget, or to the box itself.
function makeDialog(title, boxClass, onKey) {
  var overlay = document.createElement('div');
  overlay.className = 'tiptap-modal-overlay';
  var modal = document.createElement('div');
  modal.className = boxClass || 'tiptap-modal';

  function onKeydown(e) {
    if (e.key === 'Escape') close();
    else if (onKey) onKey(e);
  }

  function close() {
    document.removeEventListener('keydown', onKeydown);
    overlay.remove();
  }

  modal.appendChild(makeModalHeader(title, close));
  overlay.appendChild(modal);
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) close();
  });

  return {
    modal: modal,
    close: close,
    show: function(focusTarget, select) {
      document.addEventListener('keydown', onKeydown);
      document.body.appendChild(overlay);
      focusDialog(focusTarget || modal, select);
    },
  };
}

// The footer with the Insert button.
function makeInsertFooter(onClick) {
  var footer = document.createElement('div');
  footer.className = 'tiptap-modal-footer';
  var button = document.createElement('button');
  button.className = 'tiptap-modal-insert-btn';
  button.type = 'button';
  button.textContent = t('dialog.insert');
  button.addEventListener('click', onClick);
  footer.appendChild(button);
  return { footer: footer, button: button };
}

function makeEmptyNote(text) {
  var empty = document.createElement('div');
  empty.className = 'tiptap-modal-empty';
  empty.textContent = text;
  return empty;
}

export function openAttachmentPicker(editor, urlMap) {
  var filenames = sortedNames(Object.keys(urlMap || {}));
  var selected = null;
  var dialog = makeDialog(t('attachment_dialog.title'));

  var list = document.createElement('div');
  list.className = 'tiptap-modal-list';
  if (filenames.length === 0) list.appendChild(makeEmptyNote(t('attachment_dialog.empty')));

  var insert = makeInsertFooter(function() {
    if (!selected) return;
    var entry = urlMap[selected];
    var label = '📎 ' + selected;
    // Inserted as data, not as an HTML string, so that a file name with "&" or
    // quotes cannot break the markup.
    var content = entry.id
      ? { type: 'text', text: label, marks: [{ type: 'link', attrs: { href: entry.url } }] }
      // Uploaded in this form and not saved yet: until the form is saved the
      // file has no download address (entry.url is a temporary blob: URL that
      // dies with the page). Redmine's own link syntax refers to the attachment
      // by its name and becomes a link on the saved page.
      : { type: 'text', text: '📎 attachment:"' + selected + '"' };
    editor.chain().focus().insertContent(content).run();
    dialog.close();
  });
  insert.button.disabled = true;

  filenames.forEach(function(filename) {
    var item = document.createElement('div');
    item.className = 'tiptap-modal-item';

    var icon = document.createElement('span');
    icon.className = 'tiptap-modal-item-icon';
    icon.textContent = '📎';

    var name = document.createElement('span');
    name.className = 'tiptap-modal-item-name';
    name.textContent = filename;

    item.appendChild(icon);
    item.appendChild(name);

    function selectItem() {
      list.querySelectorAll('.tiptap-modal-item').forEach(function(el) {
        el.classList.remove('selected');
      });
      item.classList.add('selected');
      selected = filename;
      insert.button.disabled = false;
    }

    item.addEventListener('click', selectItem);
    item.addEventListener('dblclick', function() {
      selectItem();
      insert.button.click();
    });

    list.appendChild(item);
  });

  dialog.modal.appendChild(list);
  dialog.modal.appendChild(insert.footer);
  dialog.show();
}

export function openImagePicker(editor, urlMap) {
  var imageFiles = sortedNames(Object.keys(urlMap || {}).filter(isImageFilename));
  var selected = null;
  var dialog = makeDialog(t('image_dialog.title'), 'tiptap-modal tiptap-modal-wide', function(e) {
    if (e.key === 'Enter' && selected) insertImage(selected);
  });

  var grid = document.createElement('div');
  grid.className = 'tiptap-image-grid';
  if (imageFiles.length === 0) grid.appendChild(makeEmptyNote(t('image_dialog.empty')));

  function insertImage(filename) {
    editor.chain().focus().setImage({
      src: urlMap[filename].url,
      alt: filename,
      filename: filename,
    }).run();
    dialog.close();
  }

  imageFiles.forEach(function(filename) {
    var entry = urlMap[filename];
    var thumbnailUrl = entry.thumbnail || (entry.id ? '/attachments/thumbnail/' + entry.id + '/200' : entry.url);

    var tile = document.createElement('div');
    tile.className = 'tiptap-image-tile';
    tile.title = filename;

    var img = document.createElement('img');
    img.src = thumbnailUrl;
    img.alt = filename;
    img.loading = 'lazy';

    var label = document.createElement('div');
    label.className = 'tiptap-image-tile-name';
    label.textContent = filename;

    tile.appendChild(img);
    tile.appendChild(label);

    tile.addEventListener('click', function() {
      grid.querySelectorAll('.tiptap-image-tile').forEach(function(el) {
        el.classList.remove('selected');
      });
      tile.classList.add('selected');
      selected = filename;
    });
    tile.addEventListener('dblclick', function() { insertImage(filename); });
    grid.appendChild(tile);
  });

  dialog.modal.appendChild(grid);
  dialog.show();
}

export function openLinkModal(editor) {
  var insert;
  var dialog = makeDialog(t('link_dialog.title'), null, function(e) {
    if (e.key === 'Enter') { e.preventDefault(); insert.button.click(); }
  });

  // Selected text
  var state = editor.view.state;
  var selectedText = state.doc.textBetween(state.selection.from, state.selection.to, ' ');
  var existingHref = editor.getAttributes('link').href || '';

  var body = document.createElement('div');
  body.style.padding = '12px 16px';

  var textLabel = document.createElement('label');
  textLabel.textContent = t('link_dialog.text');
  textLabel.style.cssText = 'display:block;font-size:12px;color:#555;margin-bottom:2px;';
  var textInput = document.createElement('input');
  textInput.type = 'text';
  textInput.className = 'tiptap-link-input';
  textInput.value = selectedText;
  textInput.placeholder = t('link_dialog.text_placeholder');

  var urlLabel = document.createElement('label');
  urlLabel.textContent = t('link_dialog.url');
  urlLabel.style.cssText = 'display:block;font-size:12px;color:#555;margin:8px 0 2px;';
  var urlInput = document.createElement('input');
  urlInput.type = 'text';
  urlInput.className = 'tiptap-link-input';
  urlInput.value = existingHref;
  urlInput.placeholder = 'https://...';

  body.appendChild(textLabel);
  body.appendChild(textInput);
  body.appendChild(urlLabel);
  body.appendChild(urlInput);

  // The text and the URL go in as data, not as an HTML string: a quote in the URL or
  // "<" in the text would break the markup. setLink checks the URL (javascript: and the
  // like are refused); with a refused URL the text is inserted without a link.
  function insertLinkedText(from, text, url) {
    editor.chain().focus()
      .insertContent({ type: 'text', text: text })
      .setTextSelection({ from: from, to: from + text.length })
      .setLink({ href: url })
      .setTextSelection(from + text.length)
      .run();
  }

  insert = makeInsertFooter(function() {
    var url = urlInput.value.trim();
    var text = textInput.value.trim();
    if (!url) { dialog.close(); return; }

    if (text && (state.selection.empty || text !== selectedText)) {
      // The text goes in as a link: at the cursor, or in place of a selection whose text
      // was changed in the dialog (the field was filled with the selection, could be
      // edited, and its new text was ignored).
      insertLinkedText(state.selection.from, text, url);
    } else {
      // The selection as it is (or the link the cursor is in) - wrap it in a link
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
    dialog.close();
  });

  dialog.modal.appendChild(body);
  dialog.modal.appendChild(insert.footer);
  dialog.show(urlInput);
}

export function openTableModal(editor) {
  var insert;
  var dialog = makeDialog(t('table_dialog.title'), null, function(e) {
    if (e.key === 'Enter') { e.preventDefault(); insert.button.click(); }
  });

  var body = document.createElement('div');
  body.style.padding = '12px 16px';

  function makeField(labelText, defVal) {
    var wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;';
    var label = document.createElement('label');
    label.textContent = labelText;
    label.style.cssText = 'font-size:13px;color:#555;';
    var input = document.createElement('input');
    input.type = 'number';
    input.min = '1';
    input.max = String(MAX_TABLE_SIZE);
    input.value = defVal;
    input.style.cssText = 'width:70px;height:26px;padding:0 6px;border:1px solid #ccc;border-radius:3px;font-size:13px;';
    wrap.appendChild(label);
    wrap.appendChild(input);
    body.appendChild(wrap);
    return input;
  }

  var rowsInput = makeField(t('table_dialog.rows'), '3');
  var colsInput = makeField(t('table_dialog.columns'), '3');

  var headerWrap = document.createElement('label');
  headerWrap.style.cssText = 'display:flex;align-items:center;gap:6px;font-size:13px;color:#555;';
  var headerCheck = document.createElement('input');
  headerCheck.type = 'checkbox';
  headerCheck.checked = true;
  headerWrap.appendChild(headerCheck);
  headerWrap.appendChild(document.createTextNode(t('table_dialog.header_row')));
  body.appendChild(headerWrap);

  // What the field says, kept to 1..MAX_TABLE_SIZE (as its min and max say; typed-in
  // values are not held to them, and a table of 1000 x 1000 cells froze the page). An
  // empty or unreadable field gives the default.
  function tableSize(input) {
    var n = parseInt(input.value, 10);
    if (isNaN(n)) return 3;
    return Math.min(MAX_TABLE_SIZE, Math.max(1, n));
  }

  insert = makeInsertFooter(function() {
    editor.chain().focus().insertTable({
      rows: tableSize(rowsInput),
      cols: tableSize(colsInput),
      withHeaderRow: headerCheck.checked,
    }).run();
    dialog.close();
  });

  dialog.modal.appendChild(body);
  dialog.modal.appendChild(insert.footer);
  // The focus goes to the dialog: left in the editor, Enter there split the paragraph
  // before the dialog inserted the table, and digits typed went into the text.
  dialog.show(rowsInput, true);
}
