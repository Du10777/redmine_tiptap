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

// --- Ограничение высоты области ввода ---------------------------------------
// Без ограничения редактор растёт под объём текста: тулбар уезжает вверх за
// край экрана, а кнопки формы («Сохранить»/«Отмена») — вниз. Считаем, сколько
// места реально остаётся по вертикали, и включаем прокрутку внутри области.
// Всё в CSS-пикселях, поэтому смена масштаба страницы (Ctrl +/-) сама даёт
// больше или меньше доступной высоты — достаточно пересчитать на resize.

var MIN_EDITOR_HEIGHT = 160;     // ниже не опускаемся даже на низком экране
var FALLBACK_BELOW = 220;        // запас под кнопки, если форму найти не удалось
var EDITOR_GAP = 16;             // небольшой зазор, чтобы кнопки не липли к краю
var MIN_VIEWPORT_RATIO = 0.45;   // меньше этой доли экрана редактор не делаем
var STICKY_FALLBACK = 50;        // Redmine сам компенсирует шапку через scroll-margin-top: 50px

// Прилипшая шапка задачи (#sticky-issue-header) — это position: fixed поверх
// страницы: вёрстку она не сдвигает, а накрывает верх окна. Место под неё
// резервируем всегда, даже пока она скрыта, — она появится, как только
// страницу прокрутят к форме, и иначе спрячет под собой тулбар редактора.
function topOverlayHeight() {
  var bar = document.getElementById('sticky-issue-header');
  if (!bar) return 0;
  var h = bar.getBoundingClientRect().height;
  return h > 0 ? h : STICKY_FALLBACK;
}

// Кнопки формы («Сохранить»/«Создать»), до которых редактор должен «дотянуться».
function submitAnchor(wrapper) {
  var form = wrapper.closest('form');
  if (!form) return null;
  return form.querySelector('input[type="submit"], button[type="submit"]')
    || form.querySelector('.buttons');
}

function applyMaxHeight(wrapper) {
  // Размер, выставленный ручкой, важнее автоподбора.
  if (wrapper._tiptapManualHeight) return;

  // У скрытого редактора (форма правки задачи до её раскрытия) все размеры
  // нулевые — мерить нечего. Оставляем запасное значение из CSS и пересчитаем,
  // когда редактор появится на экране.
  if (wrapper.getClientRects().length === 0) return;

  var content = wrapper.querySelector('.tiptap-content');
  var toolbar = wrapper.querySelector('.tiptap-toolbar');
  if (!content || !toolbar) return;

  // На столько по вертикали мы претендуем: окно минус перекрытая сверху полоса.
  var target = window.innerHeight - topOverlayHeight() - EDITOR_GAP;
  var anchorEl = submitAnchor(wrapper);
  var avail;

  if (anchorEl) {
    // Не моделируем вёрстку формы, а меряем её как есть: сколько сейчас занимает
    // всё от верха тулбара до низа кнопок. Уменьшение области ввода на N пикселей
    // ровно на столько же поднимает кнопки, поэтому нужную высоту получаем одной
    // арифметической поправкой — независимо от того, что ещё стоит на форме.
    var span = anchorEl.getBoundingClientRect().bottom - toolbar.getBoundingClientRect().top;
    avail = content.getBoundingClientRect().height - (span - target);
  } else {
    avail = target - toolbar.offsetHeight - FALLBACK_BELOW;
  }

  // На формах, где под редактором стоит ещё много всего (правка задачи: ниже
  // описания идут атрибуты и редактор примечаний), «дотянуться до кнопок»
  // означало бы схлопнуть редактор почти в ноль. Ниже этой доли экрана не идём.
  var floorH = window.innerHeight * MIN_VIEWPORT_RATIO;
  if (avail < floorH) avail = floorH;
  if (avail < MIN_EDITOR_HEIGHT) avail = MIN_EDITOR_HEIGHT;

  wrapper.style.setProperty('--tiptap-max-height', Math.round(avail) + 'px');
}

// Редактор может быть создан скрытым (форма правки задачи раскрывается позже).
// display:none не порождает мутаций childList, поэтому ловим момент появления
// через ResizeObserver и считаем высоту только на переходе «скрыт -> виден» —
// так пересчёт не зацикливается на собственных изменениях размера.
var sizeObserver = window.ResizeObserver
  ? new window.ResizeObserver(function(entries) {
      entries.forEach(function(entry) {
        var wrapper = entry.target;
        var visible = entry.contentRect.height > 0 || entry.contentRect.width > 0;
        if (!visible) {
          wrapper._tiptapHidden = true;
        } else if (wrapper._tiptapHidden) {
          wrapper._tiptapHidden = false;
          applyMaxHeight(wrapper);
        }
      });
    })
  : null;

function watchVisibility(wrapper) {
  if (!sizeObserver) return;
  wrapper._tiptapHidden = wrapper.getClientRects().length === 0;
  sizeObserver.observe(wrapper);
}

var maxHeightPending = false;
function refreshMaxHeights() {
  if (maxHeightPending) return;
  maxHeightPending = true;
  window.requestAnimationFrame(function() {
    maxHeightPending = false;
    document.querySelectorAll('.tiptap-wrapper').forEach(applyMaxHeight);
  });
}

// --- Ручка изменения размера -------------------------------------------------
// Автоподбор высоты подходит не всем и не всегда, поэтому даём утащить нижний
// правый угол области ввода мышью. Выбранная высота запоминается и применяется
// ко всем редакторам; двойной клик по ручке возвращает автоматический режим.

var HEIGHT_STORAGE_KEY = 'redmineTiptapEditorHeight';

function readStoredHeight() {
  try {
    var value = parseInt(window.localStorage.getItem(HEIGHT_STORAGE_KEY), 10);
    return value > 0 ? value : 0;
  } catch (e) {
    return 0;   // localStorage может быть недоступен (приватный режим, политика)
  }
}

function writeStoredHeight(height) {
  try {
    if (height) {
      window.localStorage.setItem(HEIGHT_STORAGE_KEY, String(height));
    } else {
      window.localStorage.removeItem(HEIGHT_STORAGE_KEY);
    }
  } catch (e) { /* не критично: размер просто не переживёт перезагрузку */ }
}

function setManualHeight(wrapper, height) {
  wrapper._tiptapManualHeight = height;
  wrapper.style.setProperty('--tiptap-height', height + 'px');
  wrapper.style.setProperty('--tiptap-max-height', height + 'px');
}

function clearManualHeight(wrapper) {
  wrapper._tiptapManualHeight = 0;
  wrapper.style.removeProperty('--tiptap-height');
  applyMaxHeight(wrapper);
}

function buildResizer(wrapper) {
  var grip = document.createElement('div');
  grip.className = 'tiptap-resizer';
  grip.title = 'Потянуть — изменить высоту редактора, двойной клик — вернуть автоматическую';

  grip.addEventListener('pointerdown', function(event) {
    event.preventDefault();

    // Тянуть могли за любую из двух областей — считаем от видимой.
    var box = wrapper.querySelector('.tiptap-content');
    var source = wrapper.querySelector('.tiptap-source');
    if (source && source.style.display !== 'none') box = source;

    var startY = event.clientY;
    var startHeight = box.getBoundingClientRect().height;

    function onMove(moveEvent) {
      var height = Math.round(startHeight + (moveEvent.clientY - startY));
      if (height < MIN_EDITOR_HEIGHT) height = MIN_EDITOR_HEIGHT;
      setManualHeight(wrapper, height);
    }

    function onUp() {
      grip.removeEventListener('pointermove', onMove);
      grip.removeEventListener('pointerup', onUp);
      grip.removeEventListener('pointercancel', onUp);
      writeStoredHeight(wrapper._tiptapManualHeight);
    }

    // Захват указателя: события доедут до ручки, даже если курсор ушёл за её край.
    grip.setPointerCapture(event.pointerId);
    grip.addEventListener('pointermove', onMove);
    grip.addEventListener('pointerup', onUp);
    grip.addEventListener('pointercancel', onUp);
  });

  grip.addEventListener('dblclick', function(event) {
    event.preventDefault();
    writeStoredHeight(0);
    document.querySelectorAll('.tiptap-wrapper').forEach(clearManualHeight);
  });

  return grip;
}

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
      // Переводы строки вокруг содержимого блока кода не добавляем: после
      // <code> браузер их не отбрасывает (в отличие от <pre>), и в режиме
      // просмотра они превращались в пустую строку сверху и снизу блока.
      textarea.value = serializeAttachmentHTML(props.editor.getHTML())
        .replace(/<details open="">/g, '<details>');
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

  wrapper.appendChild(buildResizer(wrapper));

  var stored = readStoredHeight();
  if (stored) {
    setManualHeight(wrapper, stored);
  } else {
    applyMaxHeight(wrapper);
  }
  watchVisibility(wrapper);
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

function boot() {
  scanAndInit();
  setupSavedTableCopy();
  setupSavedTaskList();
  var observer = new MutationObserver(function() {
    scanAndInit();
    setupSavedTaskList();
    refreshMaxHeights();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // resize срабатывает и при смене масштаба страницы (Ctrl +/-):
  // window.innerHeight задан в CSS-пикселях, поэтому при отдалении
  // доступная высота редактора автоматически становится больше.
  window.addEventListener('resize', refreshMaxHeights);
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', refreshMaxHeights);
  }

  // Редактор мог быть скрыт в момент создания (форма правки задачи
  // раскрывается по кнопке) — к моменту фокуса размеры уже настоящие.
  document.addEventListener('focusin', function(e) {
    if (e.target.closest && e.target.closest('.tiptap-wrapper')) refreshMaxHeights();
  });
}

// Бандл подключается из <head>, поэтому к моменту его выполнения document.body
// может ещё не существовать — ждём готовности DOM.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
