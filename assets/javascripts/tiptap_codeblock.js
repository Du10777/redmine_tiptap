import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';

// Один движок подсветки и для редактора, и для просмотра — иначе цвета
// в этих двух режимах разъезжаются.
//
// Языки сюда не вшиты. Они лежат по файлу на язык в папке highlight/ плагина;
// highlight/_compile.sh собирает их в assets/javascripts/tiptap_highlight.js.
// Тот подключается раньше этого бандла и кладёт список языков в
// window.TiptapHighlightLanguages — здесь он регистрируется. Если файла с
// языками нет, редактор работает как обычно, просто без подсветки.
var LANGUAGES = (window.TiptapHighlightLanguages || []).filter(function(lang) {
  return lang && lang.id && typeof lang.grammar === 'function';
});

export const lowlight = createLowlight();

// Как язык подписан в списке и на ярлыке, пояснение в списке и слова, по
// которым его можно найти — всё это задаётся в файле языка. Языки без
// подписи показываются под своим идентификатором.
var LANGUAGE_INFO = {};

LANGUAGES.forEach(function(lang) {
  try {
    lowlight.register(lang.id, lang.grammar);
    LANGUAGE_INFO[lang.id] = { label: lang.label, hint: lang.hint, keywords: lang.keywords };
  } catch (e) { /* сломанный файл языка не должен ронять редактор */ }
});

// plaintext нужен всегда: это «без подсветки» и язык блока по умолчанию.
// Без него TipTap включил бы для таких блоков автоопределение языка.
if (!lowlight.registered('plaintext')) {
  lowlight.register('plaintext', function() {
    return { name: 'Plain text', aliases: ['text', 'txt'], disableAutodetect: true };
  });
}

function labelOf(language) {
  return (LANGUAGE_INFO[language] && LANGUAGE_INFO[language].label) || language;
}

function searchTextOf(language) {
  var info = LANGUAGE_INFO[language] || {};
  return [language, info.label || '', info.hint || '', info.keywords || ''].join(' ').toLowerCase();
}

export const CODE_LANGUAGES = lowlight.listLanguages().slice().sort(function(a, b) {
  return labelOf(a).toLowerCase().localeCompare(labelOf(b).toLowerCase());
});

// «Без подсветки» — это не пустое значение, а явный plaintext: именно его
// TipTap подставляет как defaultLanguage, и хранить одно и то же состояние
// двумя разными способами (null и 'plaintext') значило бы путаться.
var NO_LANGUAGE = 'plaintext';
var RECENT_KEY = 'redmineTiptapCodeLangRecent';
var USAGE_KEY = 'redmineTiptapCodeLangUsage';
// Недавние держим короткими: из частых они исключаются, чтобы не дублироваться,
// и при длинном списке недавних группа «Частые» почти всегда пустовала бы.
var RECENT_LIMIT = 3;
var FREQUENT_LIMIT = 6;

// --- Запоминание выбора -----------------------------------------------------
// Список частых заранее не задан: он набирается из того, что реально выбирают.

function readJson(key, fallback) {
  try {
    var raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;   // localStorage может быть недоступен
  }
}

function writeJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) { /* не критично: выбор просто не переживёт перезагрузку */ }
}

function recentLanguages() {
  var list = readJson(RECENT_KEY, []);
  if (!Array.isArray(list)) return [];
  return list.filter(function(lang) { return lowlight.registered(lang); });
}

function frequentLanguages() {
  var usage = readJson(USAGE_KEY, {}) || {};
  return Object.keys(usage)
    .filter(function(lang) { return lowlight.registered(lang); })
    .sort(function(a, b) { return usage[b] - usage[a] || a.localeCompare(b); })
    .slice(0, FREQUENT_LIMIT);
}

function rememberLanguage(language) {
  if (!language || language === NO_LANGUAGE) return;   // «без подсветки» не запоминаем

  var recent = recentLanguages().filter(function(lang) { return lang !== language; });
  recent.unshift(language);
  writeJson(RECENT_KEY, recent.slice(0, RECENT_LIMIT));

  var usage = readJson(USAGE_KEY, {}) || {};
  usage[language] = (usage[language] || 0) + 1;
  writeJson(USAGE_KEY, usage);
}

// Есть ли у блока язык, который стоит подписывать. plaintext — это «без
// подсветки», его не подписываем ни в редакторе, ни в просмотре.
function hasLanguage(language) {
  return !!language && language !== NO_LANGUAGE;
}

// --- Выпадающий список выбора языка -----------------------------------------

var openPanel = null;

function closeLanguagePanel() {
  if (openPanel && openPanel.parentNode) openPanel.parentNode.removeChild(openPanel);
  openPanel = null;
}

document.addEventListener('mousedown', function(event) {
  if (openPanel && !openPanel.contains(event.target)) closeLanguagePanel();
}, true);

function openLanguagePanel(anchorEl, current, onPick) {
  closeLanguagePanel();

  var panel = document.createElement('div');
  panel.className = 'tiptap-lang-panel';

  var search = document.createElement('input');
  search.type = 'text';
  search.className = 'tiptap-lang-search';
  search.placeholder = 'Поиск языка';
  panel.appendChild(search);

  var list = document.createElement('div');
  list.className = 'tiptap-lang-list';
  panel.appendChild(list);

  function pick(language) {
    rememberLanguage(language);
    closeLanguagePanel();
    onPick(language);
  }

  function addOption(language, label) {
    var option = document.createElement('div');
    option.className = 'tiptap-lang-option';
    if (language === current) option.className += ' active';
    option.textContent = label || labelOf(language);
    var hint = !label && LANGUAGE_INFO[language] && LANGUAGE_INFO[language].hint;
    if (hint) {
      var hintEl = document.createElement('span');
      hintEl.className = 'tiptap-lang-hint';
      hintEl.textContent = hint;
      option.appendChild(hintEl);
    }
    option.addEventListener('mousedown', function(event) {
      event.preventDefault();
      pick(language);
    });
    list.appendChild(option);
  }

  function addGroup(title) {
    var head = document.createElement('div');
    head.className = 'tiptap-lang-group';
    head.textContent = title;
    list.appendChild(head);
  }

  function render(filter) {
    list.innerHTML = '';
    var needle = (filter || '').trim().toLowerCase();

    if (needle) {
      var matches = CODE_LANGUAGES.filter(function(lang) {
        return searchTextOf(lang).indexOf(needle) !== -1;
      });
      if (!matches.length) {
        var empty = document.createElement('div');
        empty.className = 'tiptap-lang-empty';
        empty.textContent = 'Ничего не найдено';
        list.appendChild(empty);
        return;
      }
      matches.forEach(function(lang) { addOption(lang); });
      return;
    }

    addOption(NO_LANGUAGE, 'Без подсветки (plaintext)');

    var recent = recentLanguages();
    if (recent.length) {
      addGroup('Недавние');
      recent.forEach(function(lang) { addOption(lang); });
    }

    var frequent = frequentLanguages().filter(function(lang) {
      return recent.indexOf(lang) === -1;
    });
    if (frequent.length) {
      addGroup('Частые');
      frequent.forEach(function(lang) { addOption(lang); });
    }

    addGroup('Все языки');
    CODE_LANGUAGES.forEach(function(lang) {
      if (lang !== NO_LANGUAGE) addOption(lang);   // уже показан первым пунктом
    });
  }

  search.addEventListener('input', function() { render(search.value); });
  search.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeLanguagePanel();
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      var first = list.querySelector('.tiptap-lang-option');
      if (first) first.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    }
  });

  render('');

  // Панель живёт в body: область ввода прокручивается и обрезала бы её.
  document.body.appendChild(panel);
  var rect = anchorEl.getBoundingClientRect();
  var left = Math.round(rect.right - panel.offsetWidth);
  panel.style.left = Math.max(4, left) + 'px';
  panel.style.top = Math.round(rect.bottom + 2) + 'px';
  if (rect.bottom + panel.offsetHeight > window.innerHeight - 4) {
    panel.style.top = Math.max(4, Math.round(rect.top - panel.offsetHeight - 2)) + 'px';
  }

  openPanel = panel;
  search.focus();
}

// --- Само расширение --------------------------------------------------------
// Блок кода с возможностью форматирования текста внутри:
// - marks перечислены явно БЕЗ inline-code, иначе внутренний <code> в
//   <pre><code> при обратном парсинге даёт вложенные <code>.
export const FormattableCodeBlock = CodeBlockLowlight.extend({
  marks: 'bold italic strike underline link textStyle',

  addOptions() {
    return {
      ...this.parent?.(),
      // Автоопределение языка выключено целиком: TipTap включает его для
      // блоков с незарегистрированным языком (например, если файл языка
      // убрали из highlight/), и в редакторе такой блок раскрашивался бы
      // наугад, а в просмотре оставался обычным текстом.
      lowlight: {
        highlight: function(language, value, options) { return lowlight.highlight(language, value, options); },
        highlightAuto: function(value) { return lowlight.highlight(NO_LANGUAGE, value); },
        listLanguages: function() { return lowlight.listLanguages(); },
        registered: function(name) { return lowlight.registered(name); },
      },
      // Без этого блок без языка подсвечивался бы автоопределением: ярлык
      // показывал «нет», а текст всё равно был цветным — и в просмотре
      // такого не происходило. «Без подсветки» должно значить ровно это.
      defaultLanguage: 'plaintext',
    };
  },

  addNodeView() {
    return function(props) {
      var node = props.node;
      var editor = props.editor;
      var getPos = props.getPos;

      var wrapper = document.createElement('div');
      wrapper.className = 'tiptap-code-wrapper';

      var pre = document.createElement('pre');
      var code = document.createElement('code');
      pre.appendChild(code);

      var badge = document.createElement('div');
      badge.className = 'tiptap-code-lang';
      badge.contentEditable = 'false';
      badge.title = 'Язык блока кода — нажать, чтобы выбрать';

      function syncLanguage(currentNode) {
        var language = currentNode.attrs.language || NO_LANGUAGE;
        code.className = 'language-' + language;
        if (hasLanguage(language)) {
          badge.textContent = labelOf(language);
          badge.classList.remove('tiptap-code-lang-empty');
        } else {
          // Без языка ничего не подписываем: ярлык прячется и появляется только
          // при наведении на блок — иначе язык было бы негде выбрать.
          badge.textContent = 'язык';
          badge.classList.add('tiptap-code-lang-empty');
        }
      }

      badge.addEventListener('mousedown', function(event) {
        event.preventDefault();
        event.stopPropagation();
        openLanguagePanel(badge, node.attrs.language || NO_LANGUAGE, function(language) {
          var pos = getPos();
          if (typeof pos !== 'number') return;
          var attrs = Object.assign({}, node.attrs, { language: language || NO_LANGUAGE });
          editor.view.dispatch(editor.view.state.tr.setNodeMarkup(pos, undefined, attrs));
          editor.view.focus();
        });
      });

      syncLanguage(node);
      wrapper.appendChild(badge);
      wrapper.appendChild(pre);

      return {
        dom: wrapper,
        contentDOM: code,
        update: function(updatedNode) {
          if (updatedNode.type !== node.type) return false;
          node = updatedNode;
          syncLanguage(updatedNode);
          return true;
        },
        // Всё, что происходит в бейдже, документа не касается.
        ignoreMutation: function(mutation) {
          return !code.contains(mutation.target);
        },
      };
    };
  },

  addCommands() {
    return {
      ...this.parent?.(),

      // Вытащить текст из блока кода в обычный параграф.
      // Есть выделение -> режем блок на: код(до) + параграф(выделенное) + код(после).
      // Нет выделения (курсор в блоке) -> весь блок превращается в параграф.
      liftFromCodeBlock: () => function(props) {
        var state = props.state;
        var dispatch = props.dispatch;
        var tr = props.tr;
        var sel = state.selection;
        var $from = sel.$from;

        var depth = $from.depth;
        while (depth > 0 && $from.node(depth).type.name !== 'codeBlock') depth--;
        if (depth < 1 || $from.node(depth).type.name !== 'codeBlock') return false;

        var cbNode = $from.node(depth);
        var before = $from.before(depth);
        var contentStart = before + 1;
        var content = cbNode.content;

        var fromOff, toOff;
        if (sel.empty) {
          fromOff = 0;
          toOff = content.size;
        } else {
          fromOff = sel.from - contentStart;
          toOff = sel.to - contentStart;
        }

        // Отрезаем разделительные \n, примыкающие к выделению, чтобы
        // соседние блоки кода не получили лишний ведущий/хвостовой перенос.
        var full = cbNode.textContent;
        var beforeEnd = fromOff;
        var afterStart = toOff;
        if (!sel.empty) {
          if (fromOff > 0 && full[fromOff - 1] === '\n') beforeEnd = fromOff - 1;
          if (toOff < full.length && full[toOff] === '\n') afterStart = toOff + 1;
        }

        var fragBefore = content.cut(0, beforeEnd);
        var fragMiddle = content.cut(fromOff, toOff);
        var fragAfter = content.cut(afterStart, content.size);

        var paraType = state.schema.nodes.paragraph;
        var nodes = [];
        if (fragBefore.size) nodes.push(cbNode.type.create(cbNode.attrs, fragBefore));
        nodes.push(paraType.create(null, fragMiddle));
        if (fragAfter.size) nodes.push(cbNode.type.create(cbNode.attrs, fragAfter));

        tr.replaceWith(before, before + cbNode.nodeSize, nodes);
        if (dispatch) dispatch(tr);
        return true;
      },
    };
  },
});

// --- Подсветка сохранённого текста (режим просмотра) ------------------------
// Тем же движком и теми же классами, что и в редакторе, иначе один и тот же
// код выглядел бы в этих режимах по-разному.

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function hastToHtml(node) {
  if (node.type === 'text') return escapeHtml(node.value);
  var inner = (node.children || []).map(hastToHtml).join('');
  if (node.type !== 'element') return inner;
  var classes = (node.properties && node.properties.className) || [];
  return '<span class="' + escapeHtml(classes.join(' ')) + '">' + inner + '</span>';
}

function languageOf(codeEl) {
  var match = (codeEl.className || '').match(/language-([\w+#-]+)/);
  return match ? match[1] : NO_LANGUAGE;
}

export function highlightSavedCodeBlocks() {
  var blocks = document.querySelectorAll('.wiki pre > code');

  Array.prototype.forEach.call(blocks, function(code) {
    if (code.closest('.ProseMirror')) return;   // в редакторе красит само расширение

    var language = languageOf(code);

    // Подсветка. Redmine, добавляя кнопку «Копировать», подменяет <pre> его
    // копией — флаг на <code> копируется вместе с ним, поэтому повторно уже
    // подсвеченный код не трогаем.
    if (!code.dataset.tiptapHighlighted) {
      code.dataset.tiptapHighlighted = '1';
      if (hasLanguage(language) && lowlight.registered(language)) {
        try {
          code.innerHTML = hastToHtml(lowlight.highlight(language, code.textContent));
        } catch (e) { /* неизвестная грамматика — оставляем текст как есть */ }
      }
    }

    if (!hasLanguage(language)) return;

    // Ярлык ставим только в обёртку Redmine (div.pre-wrapper). Пока её нет,
    // ставить некуда: Redmine потом заменит <pre> копией, и ярлык снаружи
    // осиротел бы. Когда обёртка появится, MutationObserver вызовет нас снова.
    var wrapper = code.parentNode && code.parentNode.parentNode;
    if (!wrapper || !wrapper.classList || !wrapper.classList.contains('pre-wrapper')) return;
    if (wrapper.querySelector(':scope > .tiptap-code-corner')) return;

    // «Копировать» и ярлык в одном flex-контейнере: кнопка встаёт слева от
    // ярлыка сама, без замеров ширины. Обработчик клика у кнопки висит на
    // самом элементе и читает текст из исходного <pre>, так что перенос ему
    // не мешает.
    var corner = document.createElement('div');
    corner.className = 'tiptap-code-corner';
    var copyLink = wrapper.querySelector(':scope > a.copy-pre-content-link');
    if (copyLink) corner.appendChild(copyLink);

    var badge = document.createElement('div');
    badge.className = 'tiptap-code-lang tiptap-code-lang-static';
    badge.textContent = labelOf(language);
    corner.appendChild(badge);

    wrapper.insertBefore(corner, wrapper.firstChild);
  });
}
