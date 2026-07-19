// ПКМ-меню для работы с таблицей
export function setupTableContextMenu(editorDiv, editor) {
  editorDiv.addEventListener('contextmenu', function(e) {
    var cell = e.target.closest('td, th');
    if (!cell || !editorDiv.contains(cell)) return;
    if (!editor.isActive('table')) return;

    e.preventDefault();
    closeMenu();

    var menu = document.createElement('div');
    menu.className = 'tiptap-table-menu';
    menu.id = 'tiptap-table-menu';

    var items = [
      { label: 'Добавить столбец слева',  action: function() { editor.chain().focus().addColumnBefore().run(); } },
      { label: 'Добавить столбец справа', action: function() { editor.chain().focus().addColumnAfter().run(); } },
      { label: 'Удалить столбец',         action: function() { editor.chain().focus().deleteColumn().run(); } },
      { sep: true },
      { label: 'Добавить строку сверху',  action: function() { editor.chain().focus().addRowBefore().run(); } },
      { label: 'Добавить строку снизу',   action: function() { editor.chain().focus().addRowAfter().run(); } },
      { label: 'Удалить строку',          action: function() { editor.chain().focus().deleteRow().run(); } },
      { sep: true },
      { label: 'Объединить ячейки',       action: function() { editor.chain().focus().mergeCells().run(); } },
      { label: 'Разделить ячейку',        action: function() { editor.chain().focus().splitCell().run(); } },
      { sep: true },
      { label: 'Первая строка — заголовок',  action: function() { editor.chain().focus().toggleHeaderRow().run(); } },
      { label: 'Первый столбец — заголовок', action: function() { editor.chain().focus().toggleHeaderColumn().run(); } },
      { sep: true },
      { label: 'Удалить таблицу', action: function() { editor.chain().focus().deleteTable().run(); }, danger: true },
    ];

    items.forEach(function(item) {
      if (item.sep) {
        var sep = document.createElement('div');
        sep.className = 'tiptap-table-menu-sep';
        menu.appendChild(sep);
        return;
      }
      var el = document.createElement('div');
      el.className = 'tiptap-table-menu-item' + (item.danger ? ' danger' : '');
      el.textContent = item.label;
      el.addEventListener('mousedown', function(ev) {
        ev.preventDefault();
        item.action();
        closeMenu();
      });
      menu.appendChild(el);
    });

    menu.style.top = (e.clientY + window.scrollY) + 'px';
    menu.style.left = (e.clientX + window.scrollX) + 'px';
    document.body.appendChild(menu);

    setTimeout(function() {
      document.addEventListener('mousedown', onDocClick);
    }, 0);
  });

  function onDocClick(e) {
    var menu = document.getElementById('tiptap-table-menu');
    if (menu && !menu.contains(e.target)) closeMenu();
  }

  function closeMenu() {
    var menu = document.getElementById('tiptap-table-menu');
    if (menu) menu.remove();
    document.removeEventListener('mousedown', onDocClick);
  }
}
