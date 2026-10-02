import CodeBlock from '@tiptap/extension-code-block';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
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

// --- Подсветка в редакторе ---------------------------------------------------
// Своя замена плагину CodeBlockLowlight из TipTap. Тот на каждое нажатие
// клавиши внутри блока кода заново раскрашивал ВСЕ блоки документа: на логе в
// 3000 строк это 140 мс на символ, а на слабом ноутбуке — больше полсекунды.
// Здесь на нажатие готовая раскраска только сдвигается вместе с текстом, а
// перекраска идёт после паузы в наборе и только для изменившихся блоков.

var HIGHLIGHT_KEY = new PluginKey('tiptapCodeHighlight');
var HIGHLIGHT_DELAY = 50;   // мс паузы в наборе до перекраски

// Раскраска блока, привязанная к самому узлу документа. Узлы ProseMirror
// неизменяемы: пока блок не правили, это тот же объект, и раскрашивать его
// заново не нужно. Новый или изменённый блок — новый объект, его в кэше нет.
var blockTokenCache = new WeakMap();

function collectTokens(nodes, classes, out, offset) {
  nodes.forEach(function(node) {
    if (node.type === 'text') {
      if (classes.length) {
        out.push({ from: offset.pos, to: offset.pos + node.value.length, cls: classes.join(' ') });
      }
      offset.pos += node.value.length;
      return;
    }
    var own = (node.properties && node.properties.className) || [];
    collectTokens(node.children || [], classes.concat(own), out, offset);
  });
}

function blockTokens(node) {
  var tokens = blockTokenCache.get(node);
  if (tokens) return tokens;
  tokens = [];
  var language = node.attrs.language;
  // Незарегистрированный язык — обычный текст. Автоопределения языка нет:
  // иначе блок раскрашивался бы наугад, а в просмотре оставался без цвета.
  if (hasLanguage(language) && lowlight.registered(language)) {
    try {
      collectTokens(lowlight.highlight(language, node.textContent).children, [], tokens, { pos: 0 });
    } catch (e) {
      tokens = [];
    }
  }
  blockTokenCache.set(node, tokens);
  return tokens;
}

function codeDecorations(doc) {
  var decorations = [];
  doc.descendants(function(node, pos) {
    if (node.type.name !== 'codeBlock') return true;
    blockTokens(node).forEach(function(token) {
      decorations.push(Decoration.inline(pos + 1 + token.from, pos + 1 + token.to, { class: token.cls }));
    });
    return false;
  });
  return DecorationSet.create(doc, decorations);
}

// Есть ли блок кода, которого ещё нет в кэше раскраски, — новый или изменённый.
function hasStaleBlocks(doc) {
  var stale = false;
  doc.descendants(function(node) {
    if (stale) return false;
    if (node.type.name !== 'codeBlock') return true;
    if (!blockTokenCache.has(node)) stale = true;
    return false;
  });
  return stale;
}

function codeHighlightPlugin() {
  return new Plugin({
    key: HIGHLIGHT_KEY,
    state: {
      init: function(config, state) {
        return { decorations: codeDecorations(state.doc), stale: false };
      },
      apply: function(tr, value, oldState, newState) {
        if (tr.getMeta(HIGHLIGHT_KEY)) {
          return { decorations: codeDecorations(newState.doc), stale: false };
        }
        if (!tr.docChanged) return value;
        // На правку только сдвигаем готовую раскраску вслед за текстом.
        return {
          decorations: value.decorations.map(tr.mapping, tr.doc),
          stale: value.stale || hasStaleBlocks(newState.doc),
        };
      },
    },
    props: {
      decorations: function(state) {
        return HIGHLIGHT_KEY.getState(state).decorations;
      },
    },
    view: function() {
      var timer = null;
      return {
        // Каждое новое изменение откладывает перекраску: она случится, когда
        // в наборе наступит пауза в HIGHLIGHT_DELAY мс.
        update: function(view) {
          if (!HIGHLIGHT_KEY.getState(view.state).stale) return;
          clearTimeout(timer);
          timer = setTimeout(function() {
            timer = null;
            if (view.isDestroyed) return;
            view.dispatch(view.state.tr.setMeta(HIGHLIGHT_KEY, true).setMeta('addToHistory', false));
          }, HIGHLIGHT_DELAY);
        },
        destroy: function() {
          clearTimeout(timer);
        },
      };
    },
  });
}

// --- Само расширение --------------------------------------------------------
// Блок кода с возможностью форматирования текста внутри:
// - marks перечислены явно БЕЗ inline-code, иначе внутренний <code> в
//   <pre><code> при обратном парсинге даёт вложенные <code>.
export const FormattableCodeBlock = CodeBlock.extend({
  marks: 'bold italic strike underline link textStyle',

  addOptions() {
    return {
      ...this.parent?.(),
      // Блок без явного языка — «без подсветки». Значение попадает и в
      // атрибут, поэтому в сохранённом HTML это видно как language-plaintext.
      defaultLanguage: 'plaintext',
    };
  },

  addProseMirrorPlugins() {
    return (this.parent?.() || []).concat([codeHighlightPlugin()]);
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

// Раскрашиваем сохранённый блок, только когда он оказывается на экране или
// рядом с ним. Страница с большими логами открывается сразу, а блок внутри
// свёрнутого Collapse не стоит ничего, пока его не раскроют (у содержимого
// закрытого <details> нет размеров, и наблюдатель его не видит).
var viewHighlightObserver = window.IntersectionObserver
  ? new window.IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        viewHighlightObserver.unobserve(entry.target);
        highlightCodeElement(entry.target);
      });
    }, { rootMargin: '300px 0px' })
  : null;

// Какие блоки уже отданы наблюдателю. Не флаг на элементе: Redmine подменяет
// <pre> копией, флаг скопировался бы вместе с ним, и копию никто бы не раскрасил.
var observedCodes = new WeakSet();

function highlightCodeElement(code) {
  if (code.dataset.tiptapHighlighted || !code.isConnected) return;
  code.dataset.tiptapHighlighted = '1';
  var language = languageOf(code);
  if (!hasLanguage(language) || !lowlight.registered(language)) return;
  try {
    code.innerHTML = hastToHtml(lowlight.highlight(language, code.textContent));
  } catch (e) { /* неизвестная грамматика — оставляем текст как есть */ }
}

export function highlightSavedCodeBlocks() {
  var blocks = document.querySelectorAll('.wiki pre > code');

  Array.prototype.forEach.call(blocks, function(code) {
    if (code.closest('.ProseMirror')) return;   // в редакторе красит свой плагин

    var language = languageOf(code);

    // Подсветка. Флаг tiptapHighlighted ставится уже после раскраски, и при
    // подмене <pre> копией он копируется вместе с готовыми цветами.
    if (!code.dataset.tiptapHighlighted && !observedCodes.has(code)) {
      if (viewHighlightObserver) {
        observedCodes.add(code);
        viewHighlightObserver.observe(code);
      } else {
        highlightCodeElement(code);
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
