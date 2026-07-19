// Чистит вставку таблиц из Excel/Word: убирает мусорные стили,
// картинки-скриншоты, фиксированные ширины
export function setupTablePaste(editorDiv, editor) {
  editorDiv.addEventListener('paste', function(e) {
    var clipboard = e.clipboardData;
    if (!clipboard) return;

    var html = clipboard.getData('text/html');
    if (!html || html.indexOf('<table') === -1) return;

    e.preventDefault();
    e.stopImmediatePropagation(); // не даём image-paste сработать на скриншот Excel

    var cleaned = cleanExcelTable(html);
    editor.chain().focus().insertContent(cleaned).run();
  }, true);

  // Копирование: ProseMirror сам кладёт таблицу в буфер (CellSelection не
  // отражается в DOM-выделении, поэтому cloneContents бесполезен). Ловим в
  // bubble-фазе уже готовый HTML от PM и переписываем: границы + px→pt.
  editorDiv.addEventListener('copy', function(e) {
    var html = e.clipboardData.getData('text/html');
    if (!html || html.indexOf('<table') === -1) return;

    var container = document.createElement('div');
    container.innerHTML = html;

    // убираем служебный маркер среза ProseMirror
    container.querySelectorAll('[data-pm-slice]').forEach(function(el) {
      el.removeAttribute('data-pm-slice');
    });

    container.querySelectorAll('table').forEach(function(t) {
      t.setAttribute('border', '1');
      t.style.borderCollapse = 'collapse';
      t.style.removeProperty('min-width');
    });
    container.querySelectorAll('td, th').forEach(function(cell) {
      cell.style.border = '.5pt solid windowtext';
      cell.style.padding = '1px';
    });

    // Excel читает font-size в pt, а не px — конвертируем
    container.querySelectorAll('[style*="font-size"]').forEach(function(el) {
      if (el.style.fontSize.indexOf('px') === -1) return;
      var px = parseFloat(el.style.fontSize);
      if (px) {
        el.style.fontSize = Math.round(px * 6 / 7) + 'pt';
      }
    });

    var fullHtml = '<html><body>' + container.innerHTML + '</body></html>';
    e.clipboardData.setData('text/html', fullHtml);
    e.preventDefault();
  }, false);
}

function cleanExcelTable(html) {
  var div = document.createElement('div');
  div.innerHTML = html;

  // Резолвим классы .xlNN из <style> в инлайн-стили
  var styleTag = div.querySelector('style');
  var classRules = {};
  var baseFontSize = null;
  if (styleTag) {
    var css = styleTag.textContent;
    var re = /\.(xl\d+)\s*\{([^}]*)\}/g;
    var m;
    while ((m = re.exec(css)) !== null) {
      classRules[m[1]] = m[2].replace(/\s+/g, ' ').trim();
    }
    // Базовый font-size из правила td { ... }
    var tdMatch = css.match(/(?:^|\})\s*td\s*\{([^}]*)\}/);
    if (tdMatch) {
      var fm0 = tdMatch[1].match(/font-size:\s*([\d.]+)pt/i);
      if (fm0) baseFontSize = Math.round(parseFloat(fm0[1]));
    }
  }

  var table = div.querySelector('table');
  if (!table) return html;

  table.querySelectorAll('img').forEach(function(img) { img.remove(); });

  // Собираем ширины столбцов из <col width=N>
  var colWidths = [];
  table.querySelectorAll('col').forEach(function(col) {
    var w = col.getAttribute('width');
    if (!w) {
      var st = col.getAttribute('style') || '';
      var mm = st.match(/width:\s*(\d+)/);
      w = mm ? mm[1] : null;
    }
    colWidths.push(w ? parseInt(w) : null);
  });

  // Обрабатываем ячейки
  table.querySelectorAll('tr').forEach(function(row) {
    Array.prototype.slice.call(row.children).forEach(function(cell, idx) {
      var cls = cell.getAttribute('class');
      var hasBorder = cls && classRules[cls] && /border\s*:\s*[^;]*(solid|windowtext)/i.test(classRules[cls]);

      // Сохраняем font-size, если был в классе
      var fontSize = null;
      if (cls && classRules[cls]) {
        var fm = classRules[cls].match(/font-size:\s*([\d.]+)pt/i);
        if (fm) fontSize = Math.round(parseFloat(fm[1])); // pt -> px
      }
      if (!fontSize) fontSize = baseFontSize;

      var align = cell.getAttribute('align');

      cell.removeAttribute('class');
      cell.removeAttribute('width');
      cell.removeAttribute('height');
      cell.removeAttribute('align');
      cell.removeAttribute('style');

      if (hasBorder) {
        cell.style.border = '1px solid #000';
        cell.style.padding = '4px 8px';
      }
      if (align) cell.style.textAlign = align;

      // Ширина столбца (TipTap хранит в colwidth)
      if (colWidths[idx]) {
        cell.setAttribute('colwidth', colWidths[idx]);
      }

      // Чистим лишние переносы/пробелы внутри текста ячейки
      cell.innerHTML = cell.innerHTML
        .replace(/\n\s+/g, ' ')
        .replace(/\s*<br>\s*/g, '<br>');

      // Однострочные ячейки (без <br>) не переносим
      if (cell.innerHTML.indexOf('<br>') === -1) {
        cell.style.whiteSpace = 'nowrap';
      }

      if (fontSize) {
        cell.style.fontSize = fontSize + 'px';
      }
    });
  });

  // Убираем <col>, <colgroup>, <style>
  table.querySelectorAll('col, colgroup').forEach(function(el) { el.remove(); });
  table.removeAttribute('width');
  table.removeAttribute('style');
  table.removeAttribute('border');
  table.removeAttribute('cellpadding');
  table.removeAttribute('cellspacing');

  removeEmptyEdgeColumns(table);

  var out = table.outerHTML
    .replace(/>\s+</g, '><')
    .replace(/<p>\s*<\/p>/g, '<p></p>');

  return out;
}

// Excel часто добавляет пустой служебный столбец справа/слева
function removeEmptyEdgeColumns(table) {
  var rows = Array.prototype.slice.call(table.querySelectorAll('tr'));
  if (rows.length === 0) return;

  var colCount = 0;
  rows.forEach(function(r) {
    colCount = Math.max(colCount, r.children.length);
  });

  function colEmpty(idx) {
    return rows.every(function(r) {
      var cell = r.children[idx];
      return !cell || cell.textContent.trim() === '';
    });
  }

  // Справа
  while (colCount > 1 && colEmpty(colCount - 1)) {
    rows.forEach(function(r) {
      if (r.children[colCount - 1]) r.children[colCount - 1].remove();
    });
    colCount--;
  }
  // Слева
  while (colCount > 1 && colEmpty(0)) {
    rows.forEach(function(r) {
      if (r.children[0]) r.children[0].remove();
    });
    colCount--;
  }
}

// Копирование таблиц из сохранённого вида (просмотр wiki/issue) в Excel
export function setupSavedTableCopy() {
  document.addEventListener('copy', function(e) {
    var sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    // Только если выделение внутри просмотра, не в редакторе
    var anchor = sel.anchorNode;
    if (!anchor) return;
    var el = anchor.nodeType === 1 ? anchor : anchor.parentElement;
    if (!el || !el.closest('.wiki, .wiki-page')) return;
    if (el.closest('.ProseMirror')) return; // редактор обрабатывается отдельно

    var container = document.createElement('div');
    container.appendChild(sel.getRangeAt(0).cloneContents());

    var table = container.querySelector('table');
    if (!table) {
      // При выделении внутри таблицы браузер часто отдаёт голые td/tr
      // без обёртки <table> — заворачиваем их сами.
      var hasCells = container.querySelector('td, th, tr');
      if (!hasCells) return;

      var wrap = document.createElement('table');
      var tbody = document.createElement('tbody');

      if (container.querySelector('tr')) {
        container.querySelectorAll('tr').forEach(function(tr) { tbody.appendChild(tr); });
      } else {
        var tr = document.createElement('tr');
        container.querySelectorAll('td, th').forEach(function(c) { tr.appendChild(c); });
        tbody.appendChild(tr);
      }

      wrap.appendChild(tbody);
      container.innerHTML = '';
      container.appendChild(wrap);
      table = wrap;
    }

    container.querySelectorAll('table').forEach(function(t) {
      t.setAttribute('border', '1');
      t.style.borderCollapse = 'collapse';
    });
    container.querySelectorAll('td, th').forEach(function(cell) {
      cell.style.border = '.5pt solid windowtext';
      cell.style.padding = '1px';
    });
    container.querySelectorAll('[style*="font-size"]').forEach(function(node) {
      var px = parseFloat(node.style.fontSize);
      if (px) node.style.fontSize = Math.round(px * 6 / 7) + 'pt';
    });

    e.clipboardData.setData('text/html', '<html><body>' + container.innerHTML + '</body></html>');
    e.clipboardData.setData('text/plain', sel.toString());
    e.preventDefault();
  }, true);
}
