import CodeBlock from '@tiptap/extension-code-block';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import { createLowlight } from 'lowlight';

// One highlighting engine for both the editor and the view mode - otherwise the
// colors in these two modes drift apart.
//
// Languages are not baked in here. They live one file per language in the plugin's
// highlight/ folder; highlight/_compile.sh builds them into
// assets/javascripts/tiptap_highlight.js. That file is loaded before this bundle and
// puts the language list into window.TiptapHighlightLanguages - the list is
// registered here. If the languages file is missing, the editor works as usual,
// just without highlighting.
var LANGUAGES = (window.TiptapHighlightLanguages || []).filter(function(lang) {
  return lang && lang.id && typeof lang.grammar === 'function';
});

export const lowlight = createLowlight();

// How a language is labeled in the list and on the badge, its hint in the list, and
// the words it can be found by - all of this is set in the language file. Languages
// without a label are shown under their identifier.
var LANGUAGE_INFO = {};

LANGUAGES.forEach(function(lang) {
  try {
    lowlight.register(lang.id, lang.grammar);
    LANGUAGE_INFO[lang.id] = { label: lang.label, hint: lang.hint, keywords: lang.keywords };
  } catch (e) { /* a broken language file must not bring down the editor */ }
});

// plaintext is always needed: it is "no highlighting" and the default block language.
// Without it TipTap would enable language auto-detection for such blocks.
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

// "No highlighting" is not an empty value but an explicit plaintext: that is what
// TipTap substitutes as defaultLanguage, and storing the same state in two
// different ways (null and 'plaintext') would only cause confusion.
var NO_LANGUAGE = 'plaintext';
var RECENT_KEY = 'redmineTiptapCodeLangRecent';
var USAGE_KEY = 'redmineTiptapCodeLangUsage';
// Keep the recent list short: recent languages are excluded from the frequent ones
// to avoid duplicates, and with a long recent list the "Frequent" group would almost
// always be empty.
var RECENT_LIMIT = 3;
var FREQUENT_LIMIT = 6;

// --- Remembering the choice -------------------------------------------------
// The frequent list is not predefined: it is built up from what users actually pick.

function readJson(key, fallback) {
  try {
    var raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;   // localStorage may be unavailable
  }
}

function writeJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) { /* not critical: the choice just won't survive a reload */ }
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
  if (!language || language === NO_LANGUAGE) return;   // "no highlighting" is not remembered

  var recent = recentLanguages().filter(function(lang) { return lang !== language; });
  recent.unshift(language);
  writeJson(RECENT_KEY, recent.slice(0, RECENT_LIMIT));

  var usage = readJson(USAGE_KEY, {}) || {};
  usage[language] = (usage[language] || 0) + 1;
  writeJson(USAGE_KEY, usage);
}

// Whether the block has a language worth labeling. plaintext is "no highlighting",
// so it is labeled neither in the editor nor in the view mode.
function hasLanguage(language) {
  return !!language && language !== NO_LANGUAGE;
}

// --- Language picker dropdown -----------------------------------------------

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
      if (lang !== NO_LANGUAGE) addOption(lang);   // already shown as the first item
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

  // The panel lives in body: the editing area scrolls and would clip it.
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

// --- Highlighting in the editor ----------------------------------------------
// Our own replacement for TipTap's CodeBlockLowlight plugin. On every keystroke
// inside a code block, that plugin re-highlighted ALL blocks of the document: on a
// 3000-line log that is 140 ms per character, on a weak laptop over half a second.
// Here a keystroke only shifts the existing highlighting along with the text, and
// re-highlighting happens after a pause in typing and only for the changed blocks.

var HIGHLIGHT_KEY = new PluginKey('tiptapCodeHighlight');
var HIGHLIGHT_DELAY = 50;   // ms of typing pause before re-highlighting

// A block's highlighting, tied to the document node itself. ProseMirror nodes are
// immutable: as long as the block is not edited, it is the same object and needs no
// re-highlighting. A new or changed block is a new object, which is not in the cache.
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
  // An unregistered language is plain text. There is no language auto-detection:
  // otherwise the block would be colored at random, yet stay uncolored in view mode.
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

// Whether any code block is not in the highlighting cache yet - a new or changed one.
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
        // On an edit, only shift the existing highlighting to follow the text.
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
        // Every new change postpones re-highlighting: it happens once there
        // is a pause of HIGHLIGHT_DELAY ms in typing.
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

// --- The extension itself ---------------------------------------------------
// A code block that allows text formatting inside:
// - marks are listed explicitly WITHOUT inline-code, otherwise the inner <code> in
//   <pre><code> produces nested <code> when parsed back.
export const FormattableCodeBlock = CodeBlock.extend({
  marks: 'bold italic strike underline link textStyle',

  addOptions() {
    return {
      ...this.parent?.(),
      // A block without an explicit language is "no highlighting". The value also
      // goes into the attribute, so the saved HTML shows it as language-plaintext.
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
          // Without a language nothing is labeled: the badge is hidden and appears
          // only on hovering over the block - otherwise there would be nowhere to
          // pick the language.
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
        // Whatever happens in the badge does not concern the document.
        ignoreMutation: function(mutation) {
          return !code.contains(mutation.target);
        },
      };
    };
  },

  addCommands() {
    return {
      ...this.parent?.(),

      // Lift text out of a code block into a regular paragraph.
      // Selection -> cut the block into: code(before) + paragraph(selected) + code(after).
      // No selection (cursor in the block) -> the whole block turns into a paragraph.
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

        // Cut off the \n separators adjacent to the selection, so that the
        // neighboring code blocks do not get an extra leading/trailing newline.
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

// --- Highlighting saved text (view mode) ------------------------------------
// With the same engine and the same classes as in the editor, otherwise the same
// code would look different in these modes.

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

// A saved block is highlighted only when it ends up on screen or close to it.
// A page with big logs opens right away, and a block inside a collapsed Collapse
// costs nothing until it is expanded (the contents of a closed <details> have
// no size, and the observer does not see them).
var viewHighlightObserver = window.IntersectionObserver
  ? new window.IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        viewHighlightObserver.unobserve(entry.target);
        highlightCodeElement(entry.target);
      });
    }, { rootMargin: '300px 0px' })
  : null;

// Which blocks have already been handed to the observer. Not a flag on the element:
// Redmine replaces <pre> with a copy, the flag would be copied along with it, and
// nobody would highlight the copy.
var observedCodes = new WeakSet();

function highlightCodeElement(code) {
  if (code.dataset.tiptapHighlighted || !code.isConnected) return;
  code.dataset.tiptapHighlighted = '1';
  var language = languageOf(code);
  if (!hasLanguage(language) || !lowlight.registered(language)) return;
  try {
    code.innerHTML = hastToHtml(lowlight.highlight(language, code.textContent));
  } catch (e) { /* unknown grammar - leave the text as is */ }
}

export function highlightSavedCodeBlocks() {
  var blocks = document.querySelectorAll('.wiki pre > code');

  Array.prototype.forEach.call(blocks, function(code) {
    if (code.closest('.ProseMirror')) return;   // colored by the editor's own plugin

    var language = languageOf(code);

    // Highlighting. The tiptapHighlighted flag is set only after coloring, and when
    // <pre> is replaced with a copy, it gets copied along with the finished colors.
    if (!code.dataset.tiptapHighlighted && !observedCodes.has(code)) {
      if (viewHighlightObserver) {
        observedCodes.add(code);
        viewHighlightObserver.observe(code);
      } else {
        highlightCodeElement(code);
      }
    }

    if (!hasLanguage(language)) return;

    // The badge is placed only into Redmine's wrapper (div.pre-wrapper). Until it
    // exists, there is nowhere to put it: Redmine will later replace <pre> with a
    // copy, and a badge outside would be orphaned. When the wrapper appears,
    // MutationObserver will call us again.
    var wrapper = code.parentNode && code.parentNode.parentNode;
    if (!wrapper || !wrapper.classList || !wrapper.classList.contains('pre-wrapper')) return;
    if (wrapper.querySelector(':scope > .tiptap-code-corner')) return;

    // "Copy" and the badge share one flex container: the button sits to the left of
    // the badge on its own, without measuring widths. The button's click handler is
    // attached to the element itself and reads the text from the original <pre>, so
    // the move does not interfere with it.
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
