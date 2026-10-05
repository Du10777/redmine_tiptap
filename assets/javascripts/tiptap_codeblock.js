import CodeBlock from '@tiptap/extension-code-block';
import { textblockTypeInputRule } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import { createLowlight } from 'lowlight';
import { t, tOptional } from './tiptap_i18n.js';

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
// the words it can be found by. The language file gives the base texts (English);
// the locale files (config/locales) can change the label and the hint and add search
// words for the user's language: code_languages.<id>.label / hint / keywords.
// Languages without a label are shown under their identifier.
var LANGUAGE_INFO = {};

// Alias -> language id (js -> javascript), for ```js typed in the editor.
// highlight.js calls a grammar once, when it is registered; the wrapper notes
// the aliases the grammar declares.
var LANGUAGE_ALIASES = {};

LANGUAGES.forEach(function(lang) {
  try {
    lowlight.register(lang.id, function(hljs) {
      var definition = lang.grammar(hljs);
      ((definition && definition.aliases) || []).forEach(function(alias) {
        LANGUAGE_ALIASES[String(alias).toLowerCase()] = lang.id;
      });
      return definition;
    });
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

// The translation of a language's text (label, hint or keywords) from the locale
// files, if there is one.
function translatedInfo(language, field) {
  return tOptional('code_languages.' + language + '.' + field);
}

function labelOf(language) {
  return translatedInfo(language, 'label') ||
    (LANGUAGE_INFO[language] && LANGUAGE_INFO[language].label) || language;
}

function hintOf(language) {
  return translatedInfo(language, 'hint') || (LANGUAGE_INFO[language] && LANGUAGE_INFO[language].hint) || '';
}

// The words the search box looks in: the id, both the base and the translated label
// and hint, and the base and the translated keywords.
function searchTextOf(language) {
  var info = LANGUAGE_INFO[language] || {};
  return [
    language, info.label, info.hint, info.keywords,
    translatedInfo(language, 'label'), translatedInfo(language, 'hint'), translatedInfo(language, 'keywords'),
  ].filter(Boolean).join(' ').toLowerCase();
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
  search.placeholder = t('code_block.search_language');
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
    var hint = !label && hintOf(language);
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
        empty.textContent = t('code_block.nothing_found');
        list.appendChild(empty);
        return;
      }
      matches.forEach(function(lang) { addOption(lang); });
      return;
    }

    addOption(NO_LANGUAGE, t('code_block.no_highlighting'));

    var recent = recentLanguages();
    if (recent.length) {
      addGroup(t('code_block.recent'));
      recent.forEach(function(lang) { addOption(lang); });
    }

    var frequent = frequentLanguages().filter(function(lang) {
      return recent.indexOf(lang) === -1;
    });
    if (frequent.length) {
      addGroup(t('code_block.frequent'));
      frequent.forEach(function(lang) { addOption(lang); });
    }

    addGroup(t('code_block.all_languages'));
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

// Highlighting of a text as a flat list of {from, to, cls}: offsets in the text
// and the classes of all highlight.js spans around that piece. The editor turns
// it into decorations, view mode into spans (paintTokens), so both get the same
// classes. An unregistered language is plain text. There is no language
// auto-detection: otherwise the block would be colored at random.
export function textTokens(language, text) {
  var tokens = [];
  if (hasLanguage(language) && lowlight.registered(language)) {
    try {
      collectTokens(lowlight.highlight(language, text).children, [], tokens, { pos: 0 });
    } catch (e) {
      tokens = [];
    }
  }
  return tokens;
}

function blockTokens(node) {
  var tokens = blockTokenCache.get(node);
  if (!tokens) {
    tokens = textTokens(node.attrs.language, node.textContent);
    blockTokenCache.set(node, tokens);
  }
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

// --- Typing in a code block --------------------------------------------------

var FENCE_RULES = [
  /^```([a-z0-9][\w+#.-]*)?[\s\n]$/i,
  /^~~~([a-z0-9][\w+#.-]*)?[\s\n]$/i,
];

// The language for ```name: an alias (js, sh, yml) becomes the language id, so
// the badge and the language list show the language as usual.
function fenceLanguage(name) {
  if (!name) return undefined;            // no name: the default language
  name = name.toLowerCase();
  return LANGUAGE_INFO[name] ? name : (LANGUAGE_ALIASES[name] || name);
}

// CKEditor's formatter wrote the language of a code block without the prefix TipTap
// looks for: <code class="ruby">, not class="language-ruby". The names are those of
// CodeRay (Redmine's own highlighter); the few it spells differently from
// highlight.js are mapped. Keep this list and the formatter's
// CODE_LANGUAGE_ALIASES (lib/redmine/wiki_formatting/tiptap/formatter.rb) alike.
var CODERAY_LANGUAGES = {
  java_script: 'javascript', sass: 'scss',
  text: 'plaintext', debug: 'plaintext', raydebug: 'plaintext', scanner: 'plaintext',
};

function languageOfPre(pre) {
  var code = pre.firstElementChild;
  var names = Array.prototype.slice.call((code && code.classList) || []);
  var prefixed = names.filter(function(name) { return name.indexOf('language-') === 0; });
  if (prefixed.length) return prefixed[0].slice('language-'.length) || null;

  var bare = names.filter(function(name) {
    return /^[\w+#.-]+$/.test(name) && name !== 'syntaxhl' && name !== 'hljs';
  })[0];
  if (!bare) return null;
  bare = bare.toLowerCase();
  return fenceLanguage(CODERAY_LANGUAGES[bare] || bare);
}

var INDENT = '    ';

// Tab / Shift-Tab inside a code block. Without a selection Tab inserts spaces up
// to the next tab stop and Shift-Tab outdents the current line; with a selection
// every line it touches is indented or outdented by INDENT (a leading tab
// character counts as one level). Only spaces are inserted and removed, so bold,
// links and colors inside the lines stay. TipTap's own version
// (enableTabIndentation) would replace the selected text with plain text and
// indent from the selection start instead of the line starts.
function indentCodeLines(editor, outdent) {
  var state = editor.state;
  var $from = state.selection.$from;
  var $to = state.selection.$to;
  if ($from.parent.type.name !== 'codeBlock' || !$from.sameParent($to)) return false;

  var text = $from.parent.textContent;
  var start = $from.start();              // document position of the block's first character
  var fromOff = $from.parentOffset;
  var toOff = $to.parentOffset;
  var tr = state.tr;

  if (!outdent && fromOff === toOff) {
    var column = fromOff - (text.lastIndexOf('\n', fromOff - 1) + 1);
    tr.insertText(' '.repeat(INDENT.length - column % INDENT.length));
    editor.view.dispatch(tr.scrollIntoView());
    return true;
  }

  // The lines the selection touches; a selection that ends right at the start
  // of a line does not touch that line.
  var lastOff = toOff > fromOff && text[toOff - 1] === '\n' ? toOff - 1 : toOff;
  var lineStarts = [];
  var lineStart = text.lastIndexOf('\n', fromOff - 1) + 1;
  for (;;) {
    lineStarts.push(lineStart);
    var next = text.indexOf('\n', lineStart);
    if (next < 0 || next >= lastOff) break;
    lineStart = next + 1;
  }

  // From the last line up, so that earlier positions do not shift.
  for (var i = lineStarts.length - 1; i >= 0; i--) {
    var pos = start + lineStarts[i];
    if (outdent) {
      var head = text.slice(lineStarts[i], lineStarts[i] + INDENT.length);
      var remove = head[0] === '\t' ? 1 : /^ */.exec(head)[0].length;
      if (remove) tr.delete(pos, pos + remove);
    } else {
      tr.insert(pos, state.schema.text(INDENT));
    }
  }
  if (tr.docChanged) editor.view.dispatch(tr.scrollIntoView());
  return true;                            // keep Tab inside the block even if there was nothing to do
}

// Taking code out of a code block: every line becomes a paragraph of its own.
// A paragraph cannot keep line breaks as "\n" characters: the browser shows
// them as spaces, and after saving the lines are glued into one.
function linesToParagraphs(fragment, paragraphType) {
  var lines = [[]];
  fragment.forEach(function(node) {
    if (!node.isText) {
      lines[lines.length - 1].push(node);
      return;
    }
    node.text.split('\n').forEach(function(part, i) {
      if (i > 0) lines.push([]);
      if (part) lines[lines.length - 1].push(node.type.schema.text(part, node.marks));
    });
  });
  return lines.map(function(nodes) { return paragraphType.create(null, nodes); });
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

  // The language is also read from a bare class name (class="ruby"), the way
  // CKEditor wrote it.
  addAttributes() {
    var parent = (this.parent && this.parent()) || {};
    return Object.assign({}, parent, {
      language: Object.assign({}, parent.language, { parseHTML: languageOfPre }),
    });
  },

  addProseMirrorPlugins() {
    return (this.parent?.() || []).concat([codeHighlightPlugin()]);
  },

  // ```lang or ~~~lang and a space at the start of a line create a code block.
  // TipTap's own rules take only a-z after the fence, so languages such as 1c,
  // docker-compose or cisco-ios could not be set this way.
  addInputRules() {
    var type = this.type;
    return FENCE_RULES.map(function(find) {
      return textblockTypeInputRule({
        find: find,
        type: type,
        getAttributes: function(match) { return { language: fenceLanguage(match[1]) }; },
      });
    });
  },

  // Tab and Shift-Tab indent and outdent lines inside a code block; without
  // this, Tab moved the focus out of the editor.
  addKeyboardShortcuts() {
    var editor = this.editor;
    return Object.assign({}, this.parent?.(), {
      Tab: function() { return indentCodeLines(editor, false); },
      'Shift-Tab': function() { return indentCodeLines(editor, true); },
    });
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
      badge.title = t('code_block.badge_title');

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
          badge.textContent = t('code_block.badge_empty');
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

      // Lift text out of a code block into regular paragraphs, one per line.
      // Selection -> cut the block into: code(before) + paragraphs(selected) + code(after).
      // No selection (cursor in the block) -> the whole block turns into paragraphs.
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
        nodes = nodes.concat(linesToParagraphs(fragMiddle, paraType));
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

// Colors a saved block in place. The block may hold formatting from the editor
// (bold, links, colors), so its markup is not replaced: the text nodes are cut
// at token boundaries and the pieces are wrapped in highlight spans inside that
// formatting. A token that crosses a formatting boundary gets a span on each side.
export function paintTokens(code, tokens) {
  var walker = document.createTreeWalker(code, NodeFilter.SHOW_TEXT);
  var textNodes = [];
  for (var node = walker.nextNode(); node; node = walker.nextNode()) textNodes.push(node);

  var offset = 0;
  var ti = 0;
  textNodes.forEach(function(textNode) {
    var text = textNode.nodeValue;
    var start = offset;
    var end = offset + text.length;
    offset = end;
    while (ti < tokens.length && tokens[ti].to <= start) ti++;
    if (!text || ti >= tokens.length || tokens[ti].from >= end) return;

    var fragment = document.createDocumentFragment();
    var pos = start;
    while (ti < tokens.length && tokens[ti].from < end) {
      var token = tokens[ti];
      var from = Math.max(token.from, start);
      var to = Math.min(token.to, end);
      if (from > pos) fragment.appendChild(document.createTextNode(text.slice(pos - start, from - start)));
      var span = document.createElement('span');
      span.className = token.cls;
      span.textContent = text.slice(from - start, to - start);
      fragment.appendChild(span);
      pos = to;
      if (token.to > end) break;          // the token goes on in the next text node
      ti++;
    }
    if (pos < end) fragment.appendChild(document.createTextNode(text.slice(pos - start)));
    textNode.parentNode.replaceChild(fragment, textNode);
  });
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
        observedCodes.delete(entry.target);
        highlightCodeElement(entry.target);
      });
    }, { rootMargin: '300px 0px' })
  : null;

// Which blocks the observer is watching. Not a flag on the element: Redmine
// replaces <pre> with a copy, the flag would be copied along with it, and nobody
// would highlight the copy. A block that Redmine replaced before it came into
// view is dropped from the observer on the next pass (highlightSavedCodeBlocks),
// so that the observer does not keep the detached element alive.
var observedCodes = new Set();

function highlightCodeElement(code) {
  if (code.dataset.tiptapHighlighted || !code.isConnected) return;
  code.dataset.tiptapHighlighted = '1';
  paintTokens(code, textTokens(languageOf(code), code.textContent));
}

export function highlightSavedCodeBlocks() {
  observedCodes.forEach(function(code) {
    if (code.isConnected) return;
    viewHighlightObserver.unobserve(code);
    observedCodes.delete(code);
  });

  var blocks = document.querySelectorAll('.wiki pre > code');

  Array.prototype.forEach.call(blocks, function(code) {
    if (code.closest('.ProseMirror')) return;   // colored by the editor's own plugin

    var language = languageOf(code);

    // Highlighting. A block is flagged with tiptapHighlighted when it is colored;
    // when Redmine replaces <pre> with a copy afterwards, the copy gets the flag
    // together with the finished colors.
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
