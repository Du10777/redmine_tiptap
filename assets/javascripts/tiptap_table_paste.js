// Cleans up tables pasted from Excel/Word: strips junk styles,
// screenshot images, fixed widths
export function setupTablePaste(editorDiv, editor) {
  editorDiv.addEventListener('paste', function(e) {
    var clipboard = e.clipboardData;
    if (!clipboard) return;

    var html = clipboard.getData('text/html');
    if (!html || html.indexOf('<table') === -1) return;

    e.preventDefault();
    e.stopImmediatePropagation(); // don't let image-paste fire on the Excel screenshot

    var cleaned = cleanPastedTables(html);
    editor.chain().focus().insertContent(cleaned).run();
  }, true);

  // Copy: ProseMirror itself puts the table on the clipboard (a CellSelection is
  // not reflected in the DOM selection, so cloneContents is useless). We catch
  // PM's ready-made HTML in the bubble phase and rewrite it: borders + px->pt.
  editorDiv.addEventListener('copy', function(e) {
    var html = e.clipboardData.getData('text/html');
    if (!html || html.indexOf('<table') === -1) return;

    var container = document.createElement('div');
    container.innerHTML = html;

    // remove ProseMirror's internal slice marker
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

    // Excel reads font-size in pt, not px - convert it
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

// Cleans every table of the pasted HTML in place and keeps the rest of it: the
// text around the tables and further tables used to be dropped, only the first
// table was inserted.
function cleanPastedTables(html) {
  var div = document.createElement('div');
  div.innerHTML = html;

  // Resolve the .xlNN classes from <style> into inline styles
  var classRules = {};
  var baseFontSize = null;
  div.querySelectorAll('style').forEach(function(styleTag) {
    var css = styleTag.textContent;
    var re = /\.(xl\d+)\s*\{([^}]*)\}/g;
    var m;
    while ((m = re.exec(css)) !== null) {
      classRules[m[1]] = m[2].replace(/\s+/g, ' ').trim();
    }
    // Base font-size from the td { ... } rule
    var tdMatch = css.match(/(?:^|\})\s*td\s*\{([^}]*)\}/);
    if (tdMatch) {
      var fm0 = tdMatch[1].match(/font-size:\s*([\d.]+)pt/i);
      if (fm0) baseFontSize = Math.round(parseFloat(fm0[1]));
    }
  });

  var tables = div.querySelectorAll('table');
  if (!tables.length) return html;
  tables.forEach(function(table) { cleanTable(table, classRules, baseFontSize); });

  // Leftovers of the clipboard document (<head> contents, Office XML).
  div.querySelectorAll('style, meta, link, title, script, xml').forEach(function(el) { el.remove(); });

  return div.innerHTML.replace(/<p>\s*<\/p>/g, '<p></p>');
}

function cleanTable(table, classRules, baseFontSize) {
  table.querySelectorAll('img').forEach(function(img) { img.remove(); });

  // Collect column widths from <col width=N>
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

  // Process the cells
  table.querySelectorAll('tr').forEach(function(row) {
    var column = 0;   // the column a cell starts in, counting the colspan of the cells before it
    Array.prototype.slice.call(row.children).forEach(function(cell) {
      var span = parseInt(cell.getAttribute('colspan'), 10) || 1;
      var widths = colWidths.slice(column, column + span);
      column += span;
      var cls = cell.getAttribute('class');
      var hasBorder = cls && classRules[cls] && /border\s*:\s*[^;]*(solid|windowtext)/i.test(classRules[cls]);

      // Keep the font-size if the class had one
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

      // Column width (TipTap stores it in colwidth: one width per spanned column)
      if (widths.length === span && widths.every(Boolean)) {
        cell.setAttribute('colwidth', widths.join(','));
      }

      // Clean up extra line breaks/spaces inside the cell text
      cell.innerHTML = cell.innerHTML
        .replace(/\n\s+/g, ' ')
        .replace(/\s*<br>\s*/g, '<br>');

      // Single-line cells (no <br>) are not wrapped
      if (cell.innerHTML.indexOf('<br>') === -1) {
        cell.style.whiteSpace = 'nowrap';
      }

      if (fontSize) {
        cell.style.fontSize = fontSize + 'px';
      }
    });
  });

  // Remove <col>, <colgroup>, <style>
  table.querySelectorAll('col, colgroup').forEach(function(el) { el.remove(); });
  table.removeAttribute('width');
  table.removeAttribute('style');
  table.removeAttribute('border');
  table.removeAttribute('cellpadding');
  table.removeAttribute('cellspacing');

  removeEmptyEdgeColumns(table);

  // Whitespace between the table's own tags (rows, cells) is not content.
  // Only there: removing it everywhere would also glue words that are
  // separated by a space between two tags, like "<b>a</b> <i>b</i>".
  table.querySelectorAll('thead, tbody, tfoot, tr').forEach(stripWhitespaceNodes);
  stripWhitespaceNodes(table);
}

function stripWhitespaceNodes(el) {
  Array.prototype.slice.call(el.childNodes).forEach(function(node) {
    if (node.nodeType === 3 && !/\S/.test(node.nodeValue)) node.remove();
  });
}

// Excel often adds an empty auxiliary column on the right/left
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

  // On the right
  while (colCount > 1 && colEmpty(colCount - 1)) {
    rows.forEach(function(r) {
      if (r.children[colCount - 1]) r.children[colCount - 1].remove();
    });
    colCount--;
  }
  // On the left
  while (colCount > 1 && colEmpty(0)) {
    rows.forEach(function(r) {
      if (r.children[0]) r.children[0].remove();
    });
    colCount--;
  }
}

// Copying tables from the saved view (wiki/issue display) into Excel
export function setupSavedTableCopy() {
  document.addEventListener('copy', function(e) {
    var sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    // Only if the selection is inside the view, not in the editor
    var anchor = sel.anchorNode;
    if (!anchor) return;
    var el = anchor.nodeType === 1 ? anchor : anchor.parentElement;
    if (!el || !el.closest('.wiki, .wiki-page')) return;
    if (el.closest('.ProseMirror')) return; // the editor is handled separately

    var container = document.createElement('div');
    container.appendChild(sel.getRangeAt(0).cloneContents());

    var table = container.querySelector('table');
    if (!table) {
      // When selecting inside a table, the browser often returns bare td/tr
      // without a <table> wrapper - we wrap them ourselves.
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
