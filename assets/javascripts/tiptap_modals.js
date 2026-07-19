export function isImageFilename(filename) {
  return /\.(png|jpe?g|gif|webp|svg|bmp)$/i.test(filename);
}

function makeModalOverlay() {
  var overlay = document.createElement('div');
  overlay.className = 'tiptap-modal-overlay';
  return overlay;
}

function makeModalHeader(title, onClose) {
  var header = document.createElement('div');
  header.className = 'tiptap-modal-header';
  header.innerHTML = '<span>' + title + '</span>';

  var closeBtn = document.createElement('button');
  closeBtn.className = 'tiptap-modal-close';
  closeBtn.type = 'button';
  closeBtn.textContent = '\u00d7';
  closeBtn.addEventListener('click', onClose);
  header.appendChild(closeBtn);
  return header;
}

export function openAttachmentPicker(editor, urlMap) {
  var filenames = Object.keys(urlMap || {}).sort(function(a, b) {
    return a.localeCompare(b);
  });
  var selected = null;

  var overlay = makeModalOverlay();
  var modal = document.createElement('div');
  modal.className = 'tiptap-modal';

  function close() {
    document.removeEventListener('keydown', onKeydown);
    overlay.remove();
  }

  modal.appendChild(makeModalHeader('Вставить вложение', close));

  var list = document.createElement('div');
  list.className = 'tiptap-modal-list';

  if (filenames.length === 0) {
    var empty = document.createElement('div');
    empty.className = 'tiptap-modal-empty';
    empty.textContent = 'Нет загруженных вложений';
    list.appendChild(empty);
  }

  var footer = document.createElement('div');
  footer.className = 'tiptap-modal-footer';

  var insertBtn = document.createElement('button');
  insertBtn.className = 'tiptap-modal-insert-btn';
  insertBtn.type = 'button';
  insertBtn.textContent = 'Вставить';
  insertBtn.disabled = true;
  footer.appendChild(insertBtn);

  filenames.forEach(function(filename) {
    var item = document.createElement('div');
    item.className = 'tiptap-modal-item';

    var icon = document.createElement('span');
    icon.className = 'tiptap-modal-item-icon';
    icon.textContent = '\ud83d\udcce';

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
      insertBtn.disabled = false;
    }

    item.addEventListener('click', selectItem);
    item.addEventListener('dblclick', function() {
      selectItem();
      insertBtn.click();
    });

    list.appendChild(item);
  });

  insertBtn.addEventListener('click', function() {
    if (!selected) return;
    editor.chain().focus().insertContent(
      '<a href="' + urlMap[selected].url + '">\ud83d\udcce ' + selected + '</a>'
    ).run();
    close();
  });

  function onKeydown(e) {
    if (e.key === 'Escape') close();
  }

  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', onKeydown);

  modal.appendChild(list);
  modal.appendChild(footer);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

export function openImagePicker(editor, urlMap) {
  var imageFiles = Object.keys(urlMap || {}).filter(isImageFilename).sort(function(a, b) {
    return a.localeCompare(b);
  });

  var overlay = makeModalOverlay();
  var modal = document.createElement('div');
  modal.className = 'tiptap-modal tiptap-modal-wide';

  function close() {
    document.removeEventListener('keydown', onKeydown);
    overlay.remove();
  }

  modal.appendChild(makeModalHeader('Вставить картинку', close));

  var grid = document.createElement('div');
  grid.className = 'tiptap-image-grid';

  if (imageFiles.length === 0) {
    var empty = document.createElement('div');
    empty.className = 'tiptap-modal-empty';
    empty.textContent = 'Нет загруженных картинок';
    grid.appendChild(empty);
  }

  imageFiles.forEach(function(filename) {
    var entry = urlMap[filename];
    var thumbnailUrl = entry.id ? '/attachments/thumbnail/' + entry.id + '/200' : entry.url;

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

    function insertImage() {
      editor.chain().focus().setImage({
        src: entry.url,
        alt: filename,
        filename: filename,
      }).run();
      close();
    }

    tile.addEventListener('click', function() {
      grid.querySelectorAll('.tiptap-image-tile').forEach(function(el) {
        el.classList.remove('selected');
      });
      tile.classList.add('selected');
    });

    tile.addEventListener('dblclick', insertImage);
    grid.appendChild(tile);
  });

  function onKeydown(e) {
    if (e.key === 'Escape') close();
    if (e.key === 'Enter') {
      var sel = grid.querySelector('.tiptap-image-tile.selected');
      if (sel) sel.dispatchEvent(new MouseEvent('dblclick'));
    }
  }

  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', onKeydown);

  modal.appendChild(grid);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

export function openLinkModal(editor) {
  var overlay = document.createElement('div');
  overlay.className = 'tiptap-modal-overlay';

  var modal = document.createElement('div');
  modal.className = 'tiptap-modal';

  function close() {
    document.removeEventListener('keydown', onKeydown);
    overlay.remove();
  }

  var header = document.createElement('div');
  header.className = 'tiptap-modal-header';
  header.innerHTML = '<span>Вставить ссылку</span>';
  var closeBtn = document.createElement('button');
  closeBtn.className = 'tiptap-modal-close';
  closeBtn.type = 'button';
  closeBtn.textContent = '\u00d7';
  closeBtn.addEventListener('click', close);
  header.appendChild(closeBtn);

  // Выделенный текст
  var state = editor.view.state;
  var selectedText = state.doc.textBetween(state.selection.from, state.selection.to, ' ');
  var existingHref = editor.getAttributes('link').href || '';

  var body = document.createElement('div');
  body.style.padding = '12px 16px';

  var textLabel = document.createElement('label');
  textLabel.textContent = 'Текст';
  textLabel.style.cssText = 'display:block;font-size:12px;color:#555;margin-bottom:2px;';
  var textInput = document.createElement('input');
  textInput.type = 'text';
  textInput.className = 'tiptap-link-input';
  textInput.value = selectedText;
  textInput.placeholder = 'Текст ссылки';

  var urlLabel = document.createElement('label');
  urlLabel.textContent = 'URL';
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

  var footer = document.createElement('div');
  footer.className = 'tiptap-modal-footer';
  var insertBtn = document.createElement('button');
  insertBtn.className = 'tiptap-modal-insert-btn';
  insertBtn.type = 'button';
  insertBtn.textContent = 'Вставить';
  footer.appendChild(insertBtn);

  insertBtn.addEventListener('click', function() {
    var url = urlInput.value.trim();
    var text = textInput.value.trim();
    if (!url) { close(); return; }

    if (state.selection.empty && text) {
      // Нет выделения — вставляем текст со ссылкой
      editor.chain().focus()
        .insertContent('<a href="' + url + '">' + text + '</a>')
        .run();
    } else {
      // Есть выделение — оборачиваем в ссылку
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
    close();
  });

  function onKeydown(e) {
    if (e.key === 'Escape') close();
    if (e.key === 'Enter') { e.preventDefault(); insertBtn.click(); }
  }

  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', onKeydown);

  modal.appendChild(header);
  modal.appendChild(body);
  modal.appendChild(footer);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  urlInput.focus();
}

export function openTableModal(editor) {
  var overlay = document.createElement('div');
  overlay.className = 'tiptap-modal-overlay';
  var modal = document.createElement('div');
  modal.className = 'tiptap-modal';

  function close() {
    document.removeEventListener('keydown', onKeydown);
    overlay.remove();
  }

  var header = document.createElement('div');
  header.className = 'tiptap-modal-header';
  header.innerHTML = '<span>Вставить таблицу</span>';
  var closeBtn = document.createElement('button');
  closeBtn.className = 'tiptap-modal-close';
  closeBtn.type = 'button';
  closeBtn.textContent = '\u00d7';
  closeBtn.addEventListener('click', close);
  header.appendChild(closeBtn);

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
    input.max = '50';
    input.value = defVal;
    input.style.cssText = 'width:70px;height:26px;padding:0 6px;border:1px solid #ccc;border-radius:3px;font-size:13px;';
    wrap.appendChild(label);
    wrap.appendChild(input);
    body.appendChild(wrap);
    return input;
  }

  var rowsInput = makeField('Строк', '3');
  var colsInput = makeField('Столбцов', '3');

  var headerWrap = document.createElement('label');
  headerWrap.style.cssText = 'display:flex;align-items:center;gap:6px;font-size:13px;color:#555;';
  var headerCheck = document.createElement('input');
  headerCheck.type = 'checkbox';
  headerCheck.checked = true;
  headerWrap.appendChild(headerCheck);
  headerWrap.appendChild(document.createTextNode('Первая строка — заголовок'));
  body.appendChild(headerWrap);

  var footer = document.createElement('div');
  footer.className = 'tiptap-modal-footer';
  var insertBtn = document.createElement('button');
  insertBtn.className = 'tiptap-modal-insert-btn';
  insertBtn.type = 'button';
  insertBtn.textContent = 'Вставить';
  footer.appendChild(insertBtn);

  insertBtn.addEventListener('click', function() {
    var rows = Math.max(1, parseInt(rowsInput.value) || 3);
    var cols = Math.max(1, parseInt(colsInput.value) || 3);
    editor.chain().focus().insertTable({
      rows: rows,
      cols: cols,
      withHeaderRow: headerCheck.checked,
    }).run();
    close();
  });

  function onKeydown(e) {
    if (e.key === 'Escape') close();
    if (e.key === 'Enter') { e.preventDefault(); insertBtn.click(); }
  }

  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', onKeydown);

  modal.appendChild(header);
  modal.appendChild(body);
  modal.appendChild(footer);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}
