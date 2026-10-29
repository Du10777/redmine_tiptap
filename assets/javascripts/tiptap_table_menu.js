import { t } from './tiptap_i18n.js';
import { primaryButtonOnly } from './tiptap_toolbar.js';

// The items of the menu: the text and the command of the editor; null is a line between groups.
var MENU_ITEMS = [
  { labelKey: 'table_menu.add_column_left', command: 'addColumnBefore' },
  { labelKey: 'table_menu.add_column_right', command: 'addColumnAfter' },
  { labelKey: 'table_menu.delete_column', command: 'deleteColumn' },
  null,
  { labelKey: 'table_menu.add_row_above', command: 'addRowBefore' },
  { labelKey: 'table_menu.add_row_below', command: 'addRowAfter' },
  { labelKey: 'table_menu.delete_row', command: 'deleteRow' },
  null,
  { labelKey: 'table_menu.merge_cells', command: 'mergeCells' },
  { labelKey: 'table_menu.split_cell', command: 'splitCell' },
  null,
  { labelKey: 'table_menu.header_row', command: 'toggleHeaderRow' },
  { labelKey: 'table_menu.header_column', command: 'toggleHeaderColumn' },
  null,
  { labelKey: 'table_menu.delete_table', command: 'deleteTable', danger: true },
];

// The menu open on the page (one at a time, whichever editor opened it).
var openMenu = null;

function closeMenu() {
  if (!openMenu) return;
  openMenu.remove();
  openMenu = null;
  document.removeEventListener('mousedown', onDocumentMousedown);
}

function onDocumentMousedown(e) {
  if (openMenu && !openMenu.contains(e.target)) closeMenu();
}

function buildMenu(editor) {
  var menu = document.createElement('div');
  menu.className = 'tiptap-table-menu';
  primaryButtonOnly(menu);   // a right click on "Delete table" deleted the table

  MENU_ITEMS.forEach(function(item) {
    var el = document.createElement('div');
    if (!item) {
      el.className = 'tiptap-table-menu-sep';
      menu.appendChild(el);
      return;
    }
    el.className = 'tiptap-table-menu-item' + (item.danger ? ' danger' : '');
    el.textContent = t(item.labelKey);
    el.addEventListener('mousedown', function(ev) {
      ev.preventDefault();
      editor.chain().focus()[item.command]().run();
      closeMenu();
    });
    menu.appendChild(el);
  });
  return menu;
}

// Right-click menu for working with a table
export function setupTableContextMenu(editorDiv, editor) {
  editorDiv.addEventListener('contextmenu', function(e) {
    var cell = e.target.closest('td, th');
    if (!cell || !editorDiv.contains(cell)) return;
    if (!editor.isActive('table')) return;

    e.preventDefault();
    closeMenu();

    openMenu = buildMenu(editor);
    openMenu.style.top = (e.clientY + window.scrollY) + 'px';
    openMenu.style.left = (e.clientX + window.scrollX) + 'px';
    document.body.appendChild(openMenu);

    // Listened for from the next task on: the mousedown of this right click is over already,
    // but a listener added now would also get events still being dispatched.
    setTimeout(function() {
      if (openMenu) document.addEventListener('mousedown', onDocumentMousedown);
    }, 0);
  });
}
