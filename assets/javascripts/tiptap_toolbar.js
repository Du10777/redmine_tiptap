import { insertCollapsible } from './tiptap_collapsible.js';
import { insertQuote } from './tiptap_quote.js';
import { openAttachmentPicker, openImagePicker, openLinkModal, openTableModal } from './tiptap_modals.js';
import { serializeAttachmentHTML, resolveAttachmentSrcs } from './tiptap_attachments.js';
import { WEB_SAFE_FONTS, FONT_SIZES } from './tiptap_formatting.js';

function makeButton(label, title, action, isActive, html) {
  var btn = document.createElement('button');
  btn.type = 'button';
  if (html) {
    btn.innerHTML = html;
  } else {
    btn.textContent = label;
  }
  btn.title = title;
  btn.className = 'tiptap-btn' + (isActive ? ' active' : '');
  btn.addEventListener('mousedown', function(e) {
    e.preventDefault();
    action();
  });
  return btn;
}

// Кнопка с обновляемым active-состоянием (не пересоздаётся при selectionUpdate)
function makeToggleButton(spec, registry) {
  var btn = makeButton(spec.label, spec.title, spec.action, false, spec.html);
  registry.push({ btn: btn, isActive: spec.isActive });
  return btn;
}

function makeSep() {
  var sep = document.createElement('span');
  sep.className = 'tiptap-sep';
  return sep;
}

// Позиционирует выпадающий список через fixed относительно кнопки —
// чтобы overflow:hidden/auto родительских контейнеров его не обрезал.
function positionDropdown(dropdown, anchor) {
  var r = anchor.getBoundingClientRect();
  dropdown.style.position = 'fixed';
  dropdown.style.top = r.bottom + 'px';
  dropdown.style.left = r.left + 'px';
}

var COLOR_PALETTE = [
  '#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#ffffff',
  '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#9900ff', '#ff00ff',
  '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e4ff', '#cfe2f3', '#d9d2e9', '#ead1dc',
  '#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a4c2f4', '#9fc5e8', '#b4a7d6', '#ea9999',
  '#e06666', '#f6b26b', '#ffd966', '#93c47d', '#6fa8dc', '#76a5af', '#8e7cc3', '#c27ba0',
  '#cc0000', '#e69138', '#f1c232', '#6aa84f', '#3d85c8', '#45818e', '#674ea7', '#a61c00',
  '#990000', '#b45309', '#bf9000', '#38761d', '#1155cc', '#134f5c', '#351c75', '#741b47',
  '#660000', '#783f04', '#7f6000', '#274e13', '#1c4587', '#0c343d', '#20124d', '#4c1130',
];

function openColorPalette(anchorEl, currentColor, onSelect) {
  var existing = document.getElementById('tiptap-color-palette');
  if (existing) { existing.remove(); return; }

  var palette = document.createElement('div');
  palette.id = 'tiptap-color-palette';
  palette.className = 'tiptap-palette';

  var hexRow = document.createElement('div');
  hexRow.className = 'tiptap-palette-hex-row';

  var hexInput = document.createElement('input');
  hexInput.type = 'text';
  hexInput.className = 'tiptap-palette-hex';
  hexInput.value = currentColor || '#000000';
  hexInput.maxLength = 7;
  hexInput.placeholder = '#000000';

  var hexBtn = document.createElement('button');
  hexBtn.type = 'button';
  hexBtn.textContent = '✓';
  hexBtn.className = 'tiptap-palette-hex-btn';
  hexBtn.addEventListener('mousedown', function(e) {
    e.preventDefault();
    onSelect(hexInput.value);
    palette.remove();
  });

  hexRow.appendChild(hexInput);
  hexRow.appendChild(hexBtn);
  palette.appendChild(hexRow);

  var grid = document.createElement('div');
  grid.className = 'tiptap-palette-grid';

  COLOR_PALETTE.forEach(function(color) {
    var cell = document.createElement('div');
    cell.className = 'tiptap-palette-cell';
    cell.style.background = color;
    cell.title = color;
    cell.addEventListener('mousedown', function(e) {
      e.preventDefault();
      onSelect(color);
      palette.remove();
    });
    grid.appendChild(cell);
  });

  palette.appendChild(grid);

  var resetBtn = document.createElement('button');
  resetBtn.type = 'button';
  resetBtn.textContent = 'Сбросить';
  resetBtn.className = 'tiptap-palette-reset';
  resetBtn.addEventListener('mousedown', function(e) {
    e.preventDefault();
    onSelect(null);
    palette.remove();
  });
  palette.appendChild(resetBtn);

  var rect = anchorEl.getBoundingClientRect();
  palette.style.top = (rect.bottom + window.scrollY + 2) + 'px';
  palette.style.left = (rect.left + window.scrollX) + 'px';

  document.body.appendChild(palette);

  function onDocClick(e) {
    if (!palette.contains(e.target) && e.target !== anchorEl) {
      palette.remove();
      document.removeEventListener('mousedown', onDocClick);
    }
  }
  setTimeout(function() {
    document.addEventListener('mousedown', onDocClick);
  }, 0);
}

var STYLE_ITEMS = [
  { value: 'h1',        label: 'Заголовок 1',    short: 'H1' },
  { value: 'h2',        label: 'Заголовок 2',    short: 'H2' },
  { value: 'h3',        label: 'Заголовок 3',    short: 'H3' },
  { value: 'paragraph', label: 'Обычный текст',  short: 'T'  },
  { value: 'h4',        label: 'Подзаголовок 4', short: 'H4' },
  { value: 'h5',        label: 'Подзаголовок 5', short: 'H5' },
  { value: 'h6',        label: 'Подзаголовок 6', short: 'H6' },
  { value: 'codeBlock', label: 'Моноширинный',   short: 'M'  },
];

var ALIGN_SVG = {
  left:    '<svg width="14" height="14" viewBox="0 0 16 16"><g fill="currentColor"><rect x="1" y="2" width="14" height="1.5"/><rect x="1" y="6" width="9" height="1.5"/><rect x="1" y="10" width="14" height="1.5"/><rect x="1" y="14" width="9" height="1.5"/></g></svg>',
  center:  '<svg width="14" height="14" viewBox="0 0 16 16"><g fill="currentColor"><rect x="1" y="2" width="14" height="1.5"/><rect x="3.5" y="6" width="9" height="1.5"/><rect x="1" y="10" width="14" height="1.5"/><rect x="3.5" y="14" width="9" height="1.5"/></g></svg>',
  right:   '<svg width="14" height="14" viewBox="0 0 16 16"><g fill="currentColor"><rect x="1" y="2" width="14" height="1.5"/><rect x="6" y="6" width="9" height="1.5"/><rect x="1" y="10" width="14" height="1.5"/><rect x="6" y="14" width="9" height="1.5"/></g></svg>',
  justify: '<svg width="14" height="14" viewBox="0 0 16 16"><g fill="currentColor"><rect x="1" y="2" width="14" height="1.5"/><rect x="1" y="6" width="14" height="1.5"/><rect x="1" y="10" width="14" height="1.5"/><rect x="1" y="14" width="14" height="1.5"/></g></svg>',
};

// Строит стабильную строку 1 тулбара. Возвращает { row1El, updateState }.
function makeRow1(editor) {
  var row = document.createElement('div');
  row.className = 'tiptap-toolbar-row';

  var toggles = []; // { btn, isActive } — обновляются в updateState

  // --- Стиль абзаца: кнопка-дропдаун с меткой H/H1../M ---
  var styleWrapper = document.createElement('span');
  styleWrapper.className = 'tiptap-style-wrapper';

  var styleBtn = document.createElement('button');
  styleBtn.type = 'button';
  styleBtn.className = 'tiptap-btn tiptap-style-btn';
  styleBtn.title = 'Стиль абзаца';
  styleBtn.textContent = 'T';

  var styleArrow = document.createElement('span');
  styleArrow.className = 'tiptap-style-arrow';
  styleArrow.textContent = '▾';
  styleBtn.appendChild(styleArrow);

  var styleDropdown = document.createElement('div');
  styleDropdown.className = 'tiptap-style-dropdown';
  styleDropdown.style.display = 'none';

  function applyStyle(val) {
    if (val === 'paragraph') {
      editor.chain().focus().setParagraph().run();
    } else if (val === 'codeBlock') {
      editor.chain().focus().setCodeBlock().run();
    } else {
      editor.chain().focus().setHeading({ level: parseInt(val.replace('h', '')) }).run();
    }
  }

  STYLE_ITEMS.forEach(function(item) {
    var opt = document.createElement('div');
    opt.className = 'tiptap-style-option';
    opt.textContent = item.label;
    opt.addEventListener('mousedown', function(e) {
      e.preventDefault();
      applyStyle(item.value);
      styleDropdown.style.display = 'none';
    });
    styleDropdown.appendChild(opt);
  });

  styleBtn.addEventListener('mousedown', function(e) {
    e.preventDefault();
    var show = styleDropdown.style.display === 'none';
    styleDropdown.style.display = show ? 'block' : 'none';
    if (show) positionDropdown(styleDropdown, styleBtn);
  });

  document.addEventListener('mousedown', function(e) {
    if (!styleWrapper.contains(e.target)) styleDropdown.style.display = 'none';
  });

  styleWrapper.appendChild(styleBtn);
  styleWrapper.appendChild(styleDropdown);
  row.appendChild(styleWrapper);

  // --- Выравнивание (кнопка-дропдаун, горизонтальное меню) ---
  var alignWrapper = document.createElement('span');
  alignWrapper.className = 'tiptap-align-wrapper';

  var alignBtn = document.createElement('button');
  alignBtn.type = 'button';
  alignBtn.className = 'tiptap-btn tiptap-align-btn';
  alignBtn.title = 'Выравнивание';

  var alignArrow = document.createElement('span');
  alignArrow.className = 'tiptap-style-arrow';
  alignArrow.textContent = '▾';

  var alignIcon = document.createElement('span');
  alignIcon.className = 'tiptap-align-icon';
  alignIcon.innerHTML = ALIGN_SVG.left;

  alignBtn.appendChild(alignIcon);
  alignBtn.appendChild(alignArrow);

  var alignDropdown = document.createElement('div');
  alignDropdown.className = 'tiptap-align-dropdown';
  alignDropdown.style.display = 'none';

  var alignTitles = { left: 'По левому краю', center: 'По центру', right: 'По правому краю', justify: 'По ширине' };
  var alignOptionBtns = {};
  ['left', 'center', 'right', 'justify'].forEach(function(al) {
    var o = document.createElement('button');
    o.type = 'button';
    o.className = 'tiptap-btn tiptap-align-option';
    o.title = alignTitles[al];
    o.innerHTML = ALIGN_SVG[al];
    o.addEventListener('mousedown', function(e) {
      e.preventDefault();
      editor.chain().focus().setTextAlign(al).run();
      alignDropdown.style.display = 'none';
    });
    alignOptionBtns[al] = o;
    alignDropdown.appendChild(o);
  });

  alignBtn.addEventListener('mousedown', function(e) {
    e.preventDefault();
    var show = alignDropdown.style.display === 'none';
    alignDropdown.style.display = show ? 'flex' : 'none';
    if (show) positionDropdown(alignDropdown, alignBtn);
  });
  document.addEventListener('mousedown', function(e) {
    if (!alignWrapper.contains(e.target)) alignDropdown.style.display = 'none';
  });

  alignWrapper.appendChild(alignBtn);
  alignWrapper.appendChild(alignDropdown);
  row.appendChild(alignWrapper);

  // --- Отступы ---
  row.appendChild(makeButton('', 'Уменьшить отступ', function() { editor.chain().focus().outdent().run(); }, false, '<svg width="14" height="14" viewBox="0 0 16 16"><g stroke="currentColor" stroke-width="1.2" stroke-linecap="round" fill="none"><line x1="1" y1="3" x2="15" y2="3"/><line x1="6" y1="6.5" x2="15" y2="6.5"/><line x1="6" y1="9.5" x2="15" y2="9.5"/><line x1="1" y1="13" x2="15" y2="13"/><path d="M4 6 L1 8 L4 10" stroke-linejoin="round"/></g></svg>'));
  row.appendChild(makeButton('', 'Увеличить отступ', function() { editor.chain().focus().indent().run(); }, false, '<svg width="14" height="14" viewBox="0 0 16 16"><g stroke="currentColor" stroke-width="1.2" stroke-linecap="round" fill="none"><line x1="1" y1="3" x2="15" y2="3"/><line x1="6" y1="6.5" x2="15" y2="6.5"/><line x1="6" y1="9.5" x2="15" y2="9.5"/><line x1="1" y1="13" x2="15" y2="13"/><path d="M1 6 L4 8 L1 10" stroke-linejoin="round"/></g></svg>'));

  row.appendChild(makeSep());

  // --- B I U S ---
  row.appendChild(makeToggleButton({ title: 'Жирный', html: '<span style="font-weight:700">B</span>',
    action: function() { editor.chain().focus().toggleBold().run(); },
    isActive: function() { return editor.isActive('bold'); } }, toggles));
  row.appendChild(makeToggleButton({ title: 'Курсив', html: '<span style="font-style:italic;font-family:Georgia,serif">I</span>',
    action: function() { editor.chain().focus().toggleItalic().run(); },
    isActive: function() { return editor.isActive('italic'); } }, toggles));
  row.appendChild(makeToggleButton({ title: 'Подчёркнутый', html: '<span style="text-decoration:underline">U</span>',
    action: function() { editor.chain().focus().toggleUnderline().run(); },
    isActive: function() { return editor.isActive('underline'); } }, toggles));
  row.appendChild(makeToggleButton({ title: 'Зачёркнутый', html: '<span style="text-decoration:line-through">S</span>',
    action: function() { editor.chain().focus().toggleStrike().run(); },
    isActive: function() { return editor.isActive('strike'); } }, toggles));

  row.appendChild(makeSep());

  // --- Шрифт: кнопка-дропдаун с иконкой Ff ---
  var fontWrapper = document.createElement('span');
  fontWrapper.className = 'tiptap-font-wrapper';

  var fontBtn = document.createElement('button');
  fontBtn.type = 'button';
  fontBtn.className = 'tiptap-btn tiptap-font-btn';
  fontBtn.title = 'Шрифт';
  fontBtn.innerHTML = '<span class="tiptap-font-icon">Ff</span><span class="tiptap-style-arrow">▾</span>';

  var fontDropdown = document.createElement('div');
  fontDropdown.className = 'tiptap-style-dropdown tiptap-font-dropdown';
  fontDropdown.style.display = 'none';

  var fontItems = [];
  function addFontOption(value, text) {
    var opt = document.createElement('div');
    opt.className = 'tiptap-style-option';
    opt.textContent = text;
    if (value) opt.style.fontFamily = value;
    opt.addEventListener('mousedown', function(e) {
      e.preventDefault();
      if (value) editor.chain().focus().setFontFamily(value).run();
      else editor.chain().focus().unsetFontFamily().run();
      fontDropdown.style.display = 'none';
    });
    fontDropdown.appendChild(opt);
    fontItems.push({ value: value, el: opt });
  }
  addFontOption('', 'По умолчанию');
  WEB_SAFE_FONTS.forEach(function(font) { addFontOption(font, font); });

  fontBtn.addEventListener('mousedown', function(e) {
    e.preventDefault();
    var show = fontDropdown.style.display === 'none';
    fontDropdown.style.display = show ? 'block' : 'none';
    if (show) positionDropdown(fontDropdown, fontBtn);
  });
  document.addEventListener('mousedown', function(e) {
    if (!fontWrapper.contains(e.target)) fontDropdown.style.display = 'none';
  });

  fontWrapper.appendChild(fontBtn);
  fontWrapper.appendChild(fontDropdown);
  row.appendChild(fontWrapper);

  // --- Размер шрифта ---
  var sizeWrapper = document.createElement('span');
  sizeWrapper.className = 'tiptap-size-wrapper';

  var sizeInput = document.createElement('input');
  sizeInput.type = 'text';
  sizeInput.className = 'tiptap-size-input';
  sizeInput.title = 'Размер шрифта';
  sizeInput.placeholder = 'Размер';

  var sizeArrow = document.createElement('span');
  sizeArrow.className = 'tiptap-size-arrow';
  sizeArrow.textContent = '▾';

  var sizeDropdown = document.createElement('div');
  sizeDropdown.className = 'tiptap-size-dropdown';
  sizeDropdown.style.display = 'none';

  function applySize() {
    var val = parseInt(sizeInput.value);
    if (val && val > 0) editor.chain().focus().setFontSize(val).run();
    else editor.chain().focus().unsetFontSize().run();
  }

  FONT_SIZES.forEach(function(size) {
    var opt = document.createElement('div');
    opt.className = 'tiptap-size-option';
    opt.textContent = size;
    opt.addEventListener('mousedown', function(e) {
      e.preventDefault();
      sizeInput.value = size;
      applySize();
      sizeDropdown.style.display = 'none';
    });
    sizeDropdown.appendChild(opt);
  });

  sizeArrow.addEventListener('mousedown', function(e) {
    e.preventDefault();
    var show = sizeDropdown.style.display === 'none';
    sizeDropdown.style.display = show ? 'block' : 'none';
    if (show) positionDropdown(sizeDropdown, sizeWrapper);
  });
  sizeInput.addEventListener('focus', function() {
    sizeDropdown.style.display = 'block';
    positionDropdown(sizeDropdown, sizeWrapper);
  });
  sizeInput.addEventListener('change', applySize);
  sizeInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      applySize();
      sizeDropdown.style.display = 'none';
      editor.commands.focus();
    } else if (e.key === 'Escape') {
      sizeDropdown.style.display = 'none';
    }
  });
  document.addEventListener('mousedown', function(e) {
    if (!sizeWrapper.contains(e.target)) sizeDropdown.style.display = 'none';
  });

  sizeWrapper.appendChild(sizeInput);
  sizeWrapper.appendChild(sizeArrow);
  sizeWrapper.appendChild(sizeDropdown);
  row.appendChild(sizeWrapper);

  // --- Цвет текста ---
  var colorBtn = document.createElement('button');
  colorBtn.type = 'button';
  colorBtn.className = 'tiptap-btn tiptap-color-btn';
  colorBtn.title = 'Цвет текста';
  colorBtn.innerHTML = '<span class="tiptap-color-label">A</span>';
  colorBtn.addEventListener('mousedown', function(e) {
    e.preventDefault();
    var currentColor = editor.getAttributes('textStyle').color || '#000000';
    openColorPalette(colorBtn, currentColor, function(color) {
      if (color) editor.chain().focus().setColor(color).run();
      else editor.chain().focus().unsetColor().run();
    });
  });
  row.appendChild(colorBtn);

  // --- Цвет фона ---
  var bgBtn = document.createElement('button');
  bgBtn.type = 'button';
  bgBtn.className = 'tiptap-btn tiptap-color-btn';
  bgBtn.title = 'Цвет фона текста';
  bgBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 11-6 6v3h9l3-3"/><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/></svg>';
  bgBtn.addEventListener('mousedown', function(e) {
    e.preventDefault();
    var currentColor = editor.getAttributes('textStyle').backgroundColor || '#ffff00';
    openColorPalette(bgBtn, currentColor, function(color) {
      if (color) editor.chain().focus().setBackgroundColor(color).run();
      else editor.chain().focus().unsetBackgroundColor().run();
    });
  });
  row.appendChild(bgBtn);

  function updateState() {
    // toggle-кнопки (BIUS)
    toggles.forEach(function(t) {
      if (t.isActive()) t.btn.classList.add('active');
      else t.btn.classList.remove('active');
    });

    // выравнивание: иконка на кнопке + active в меню
    var curAlign = 'left';
    ['center', 'right', 'justify'].forEach(function(al) {
      if (editor.isActive({ textAlign: al })) curAlign = al;
    });
    alignIcon.innerHTML = ALIGN_SVG[curAlign];
    ['left', 'center', 'right', 'justify'].forEach(function(al) {
      if (al === curAlign) alignOptionBtns[al].classList.add('active');
      else alignOptionBtns[al].classList.remove('active');
    });

    // метка стиля абзаца
    var cur = 'paragraph';
    if (editor.isActive('heading', { level: 1 })) cur = 'h1';
    else if (editor.isActive('heading', { level: 2 })) cur = 'h2';
    else if (editor.isActive('heading', { level: 3 })) cur = 'h3';
    else if (editor.isActive('heading', { level: 4 })) cur = 'h4';
    else if (editor.isActive('heading', { level: 5 })) cur = 'h5';
    else if (editor.isActive('heading', { level: 6 })) cur = 'h6';
    else if (editor.isActive('codeBlock')) cur = 'codeBlock';
    var item = STYLE_ITEMS.filter(function(i) { return i.value === cur; })[0];
    styleBtn.firstChild.textContent = item ? item.short : 'T';

    var attrs = editor.getAttributes('textStyle');
    var curFont = attrs.fontFamily ? attrs.fontFamily.replace(/["']/g, '') : '';
    fontItems.forEach(function(it) {
      if (it.value === curFont) it.el.classList.add('active');
      else it.el.classList.remove('active');
    });
    sizeInput.value = attrs.fontSize ? (parseInt(attrs.fontSize) || 14) : 14;
  }

  return { row1El: row, updateState: updateState, styleBtn: styleBtn };
}


export function buildToolbar(editor, editorDiv, sourceDiv, urlMap) {
  var bar = document.createElement('div');
  bar.className = 'tiptap-toolbar';
  var sourceMode = false;

  // Строка 1: исходники + стабильные форматирующие контролы
  var row1 = document.createElement('div');
  row1.className = 'tiptap-toolbar-row';

  var srcBtn = document.createElement('button');
  srcBtn.type = 'button';
  srcBtn.textContent = '<HTML>';
  srcBtn.title = 'Исходный код (HTML)';
  srcBtn.className = 'tiptap-btn';

  var fmt = makeRow1(editor);

  // srcBtn и разделитель — в начало строки 1, перед форматирующими контролами
  fmt.row1El.insertBefore(makeSep(), fmt.row1El.firstChild);
  fmt.row1El.insertBefore(srcBtn, fmt.row1El.firstChild);
  row1 = fmt.row1El;

  // Строка 2: остальные кнопки (пересоздаётся при обновлениях)
  var row2 = document.createElement('div');
  row2.className = 'tiptap-toolbar-row';

  bar.appendChild(row1);
  bar.appendChild(row2);

  srcBtn.addEventListener('mousedown', function(e) {
    e.preventDefault();
    sourceMode = !sourceMode;
    if (sourceMode) {
      sourceDiv.value = serializeAttachmentHTML(editor.getHTML())
        .replace(/<details open="">/g, '<details>')
        .replace(/></g, '>\n<')
        .replace(/<br>/g, '<br>\n');
      editorDiv.style.display = 'none';
      sourceDiv.style.display = 'block';
      srcBtn.classList.add('active');
    } else {
      editor.commands.setContent(resolveAttachmentSrcs(sourceDiv.value || '', urlMap));
      editorDiv.style.display = 'block';
      sourceDiv.style.display = 'none';
      srcBtn.classList.remove('active');
    }
    // прячем все контролы строки 1 (кроме srcBtn) и всю строку 2
    Array.prototype.forEach.call(row1.children, function(ch) {
      if (ch !== srcBtn) ch.style.display = sourceMode ? 'none' : '';
    });
    row2.style.display = sourceMode ? 'none' : '';
    refresh();
  });

  // --- Список: кнопка-дропдаун с иконкой нумерации ---
  var LIST_ICON = '<svg width="14" height="14" viewBox="0 0 16 16"><g transform="translate(1.5,2)"><text x="0" y="3.5" style="font-size:5px;font-weight:700;fill:currentColor">1</text><text x="0" y="8.5" style="font-size:5px;font-weight:700;fill:currentColor">2</text><text x="0" y="13.5" style="font-size:5px;font-weight:700;fill:currentColor">3</text><g stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><line x1="6" y1="2" x2="13" y2="2"/><line x1="6" y1="7" x2="13" y2="7"/><line x1="6" y1="12" x2="13" y2="12"/></g></g></svg>';

  function makeListSelect() {
    var wrapper = document.createElement('span');
    wrapper.className = 'tiptap-list-wrapper';

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'tiptap-btn tiptap-list-btn';
    btn.title = 'Список';
    btn.tabIndex = 0;
    btn.innerHTML = LIST_ICON + '<span class="tiptap-style-arrow">▾</span>';

    var dropdown = document.createElement('div');
    dropdown.className = 'tiptap-style-dropdown tiptap-list-dropdown';
    dropdown.style.display = 'none';

    var listOptions = [
      { value: 'task',                    label: '☑ Список задач' },
      { value: 'ul:disc',                 label: '• Маркеры (точки)' },
      { value: 'ul:circle',               label: '◦ Маркеры (круги)' },
      { value: 'ul:square',               label: '▪ Маркеры (квадраты)' },
      { value: 'ol:decimal',              label: '1. Нумерация (1, 2, 3)' },
      { value: 'ol:decimal-leading-zero', label: '01. Нумерация (01, 02)' },
      { value: 'ol:lower-alpha',          label: 'a. Нумерация (a, b, c)' },
      { value: 'ol:upper-alpha',          label: 'A. Нумерация (A, B, C)' },
      { value: 'ol:lower-roman',          label: 'i. Нумерация (i, ii, iii)' },
      { value: 'ol:upper-roman',          label: 'I. Нумерация (I, II, III)' },
      { value: 'ol:lower-greek',          label: 'α. Нумерация (α, β, γ)' },
    ];

    function applyList(val) {
      if (val === 'task') {
        editor.chain().focus().toggleTaskList().run();
      } else {
        var parts = val.split(':');
        var kind = parts[0], styleType = parts[1];
        var chain = editor.chain().focus();
        if (kind === 'ul') {
          if (!editor.isActive('bulletList')) chain = chain.toggleBulletList();
          chain.updateAttributes('bulletList', { listStyleType: styleType }).run();
        } else {
          if (!editor.isActive('orderedList')) chain = chain.toggleOrderedList();
          chain.updateAttributes('orderedList', { listStyleType: styleType }).run();
        }
      }
    }

    listOptions.forEach(function(o) {
      var opt = document.createElement('div');
      opt.className = 'tiptap-style-option';
      opt.textContent = o.label;
      opt.addEventListener('mousedown', function(e) {
        e.preventDefault();
        applyList(o.value);
        dropdown.style.display = 'none';
      });
      dropdown.appendChild(opt);
    });

    btn.addEventListener('mousedown', function(e) {
      e.preventDefault();
      var show = dropdown.style.display === 'none';
      dropdown.style.display = show ? 'block' : 'none';
      if (show) { positionDropdown(dropdown, btn); btn.focus(); }
    });
    // закрытие по потере фокуса (без document-listener — row2 пересоздаётся)
    wrapper.addEventListener('focusout', function(e) {
      if (!wrapper.contains(e.relatedTarget)) dropdown.style.display = 'none';
    });

    wrapper.appendChild(btn);
    wrapper.appendChild(dropdown);
    return wrapper;
  }

  function refresh() {
    fmt.updateState();
    if (sourceMode) { row2.innerHTML = ''; return; }

    row2.innerHTML = '';

    // отменить / повторить
    row2.appendChild(makeButton('\u21a9', 'Отменить',  function() { editor.chain().focus().undo().run(); }, false));
    row2.appendChild(makeButton('\u21aa', 'Повторить', function() { editor.chain().focus().redo().run(); }, false));

    row2.appendChild(makeSep());

    // collapse / inline-код / блок кода
    row2.appendChild(makeButton('', 'Collapse-блок', function() { insertCollapsible(editor); }, false, '<svg width="14" height="14" viewBox="0 0 16 16"><g fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4 L4 6 L6 4"/><line x1="8" y1="5" x2="14" y2="5"/><line x1="2" y1="10" x2="14" y2="10"/><line x1="2" y1="13" x2="10" y2="13"/></g></svg>'));
    row2.appendChild(makeButton('<>', 'Код', function() { editor.chain().focus().toggleCode().run(); }, editor.isActive('code')));
    row2.appendChild(makeButton('', 'Блок кода', function() {
      if (editor.isActive('codeBlock')) {
        editor.chain().focus().liftFromCodeBlock().run();
      } else {
        var s = editor.state.selection;
        var text = editor.state.doc.textBetween(s.from, s.to, '\n', '\n');
        editor.chain().focus().insertContentAt(
          { from: s.from, to: s.to },
          { type: 'codeBlock', content: text ? [{ type: 'text', text: text }] : [] }
        ).run();
      }
    }, editor.isActive('codeBlock'), '<svg width="14" height="14" viewBox="0 0 16 16"><g fill="none" stroke="currentColor" stroke-width="1"><rect x="1.5" y="2.5" width="13" height="11" rx="1"/><line x1="3.5" y1="6" x2="8.5" y2="6"/><line x1="3.5" y1="8.5" x2="12.5" y2="8.5"/><line x1="3.5" y1="11" x2="7.5" y2="11"/></g></svg>'));

    row2.appendChild(makeSep());

    // горизонтальная линия / цитата
    row2.appendChild(makeButton('', 'Горизонтальная линия', function() { editor.chain().focus().setHorizontalRule().run(); }, false, '<svg width="14" height="14" viewBox="0 0 16 16"><g stroke="currentColor" stroke-linecap="round"><line x1="3" y1="4" x2="13" y2="4" stroke-width="1.1" opacity="0.4"/><line x1="2" y1="8" x2="14" y2="8" stroke-width="1.8"/><line x1="3" y1="12" x2="13" y2="12" stroke-width="1.1" opacity="0.4"/></g></svg>'));
    row2.appendChild(makeButton('', 'Цитата', function() { insertQuote(editor); }, false, '<svg width="14" height="14" viewBox="0 0 16 16"><g transform="translate(1.5,2)"><rect x="0" y="0" width="2.2" height="12" rx="1" fill="currentColor"/><g transform="translate(4.5,0)" fill="currentColor"><path d="M0 5 Q0 0 4 0 Q1.5 1.5 2 3.2 L3.2 3.2 L3.2 6.5 L0 6.5 Z"/><path d="M6 5 Q6 0 10 0 Q7.5 1.5 8 3.2 L9.2 3.2 L9.2 6.5 L6 6.5 Z"/></g><g transform="translate(4.5,0)" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"><line x1="0" y1="9.5" x2="9.5" y2="9.5"/><line x1="0" y1="12" x2="6.5" y2="12"/></g></g></svg>'));

    row2.appendChild(makeSep());

    // добавить / удалить ссылку
    row2.appendChild(makeButton('', 'Ссылка', function() { openLinkModal(editor); }, editor.isActive('link'), '<svg width="14" height="14" viewBox="0 0 16 16"><g fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><path d="M7 3 L5 3 Q1.5 3 1.5 6.5 Q1.5 10 5 10 L7 10"/><path d="M9 3 L11 3 Q14.5 3 14.5 6.5 Q14.5 10 11 10 L9 10"/><line x1="5.5" y1="6.5" x2="10.5" y2="6.5"/></g></svg>'));
    row2.appendChild(makeButton('', 'Убрать ссылку', function() { editor.chain().focus().unsetLink().run(); }, false, '<svg width="14" height="14" viewBox="0 0 16 16"><g fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><path d="M6 4 L5 4 Q1.5 4 1.5 7.5 Q1.5 11 5 11 L6 11"/><path d="M10 4 L11 4 Q14.5 4 14.5 7.5 Q14.5 11 11 11 L10 11"/><line x1="5" y1="7.5" x2="7" y2="7.5"/><line x1="9" y1="7.5" x2="11" y2="7.5"/><line x1="11.5" y1="1.5" x2="14.5" y2="4.5"/><line x1="14.5" y1="1.5" x2="11.5" y2="4.5"/></g></svg>'));

    // список
    row2.appendChild(makeListSelect());

    // остальное
    var btns = [
      { label: '', title: 'Вставить таблицу',        action: function() { openTableModal(editor); }, active: false, html: '<svg width="14" height="14" viewBox="0 0 16 16"><rect x="1.5" y="2.5" width="13" height="3.2" rx="0.5" fill="currentColor"/><g fill="none" stroke="currentColor" stroke-width="1"><rect x="1.5" y="2.5" width="13" height="11" rx="0.5"/><line x1="1.5" y1="10" x2="14.5" y2="10"/><line x1="6" y1="5.7" x2="6" y2="13.5"/><line x1="10.5" y1="5.7" x2="10.5" y2="13.5"/></g></svg>' },
      { label: '\ud83d\udcce', title: 'Вставить вложение',             action: function() { openAttachmentPicker(editor, urlMap); }, active: false },
      { label: '\ud83c\udf04', title: 'Вставить картинку из вложений', action: function() { openImagePicker(editor, urlMap); },      active: false, html: '<svg width="14" height="14" viewBox="0 0 16 16"><g fill="none" stroke="currentColor" stroke-width="1"><rect x="1.5" y="2.5" width="13" height="11" rx="1"/><circle cx="5" cy="6" r="1.5"/><path d="M2 12 L6 8 L9 11 L11 9 L14 12" stroke-linejoin="round"/></g></svg>' },
    ];

    btns.forEach(function(b) {
      row2.appendChild(makeButton(b.label, b.title, b.action, b.active, b.html));
    });
  }

  editor.on('selectionUpdate', refresh);
  editor.on('transaction', refresh);
  refresh();
  return bar;
}
