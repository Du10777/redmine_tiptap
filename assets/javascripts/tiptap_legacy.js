import { Extension, Node, Mark, mergeAttributes } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { indentOf } from './tiptap_indent.js';
import { inertElement, escapeHtml } from './tiptap_inert.js';

// Texts written in CKEditor (the redmine_ckeditor plugin) hold HTML that this
// editor's schema does not know. ProseMirror drops whatever its schema lacks, so
// without the pieces below such a text lost its content as soon as somebody
// opened it for editing and saved it again: a macro with a body turned into a
// few paragraphs, <iframe>, <sub>, <sup> and CKEditor's inline styles vanished,
// pictures lost their frame, float and link, tables their borders and width.
// Every construct here is kept in the document and written back the way it was
// read. Reading (the saved view) does not need any of it, the server shows the
// stored HTML as it is - see the formatter.

// --- Redmine macros ---------------------------------------------------------
// {{collapse(Title)<newline>text<newline>}} - a macro with a body spans several
// lines, and the line breaks are what makes it work (Redmine looks for a line
// break right after the arguments and before the closing braces). A paragraph
// collapses line breaks into spaces, so the macro would stop working after the
// first save. A macro therefore becomes an atom (one indivisible inline element)
// that holds the macro text and gives it back untouched. It can be edited in the
// source mode, where it is plain text again.
//
// The pattern is Redmine's own (Redmine::WikiFormatting::Macros::MACROS_RE); "!"
// before the braces escapes a macro, such a one is shown as text, so it stays
// text here as well. Code (<pre>, <code>) is skipped for the same reason.
var PROTECT_RE = new RegExp(
  '(<pre\\b[\\s\\S]*?<\\/pre>|<code\\b[\\s\\S]*?<\\/code>)'
  + '|(!)?(\\{\\{\\w+(?:\\([^\\n\\r]*?\\))?(?:[\\n\\r][\\s\\S]*?[\\n\\r])?\\}\\})',
  'gi'
);

// What the atom shows: the first line of the macro; a macro with a body ends
// with an ellipsis.
function macroLabel(source) {
  var lines = source.split(/\r\n|\r|\n/);
  return lines.length > 1 ? lines[0] + ' … }}' : source;
}

// The macro text goes into an attribute percent-encoded: nothing in it (quotes,
// angle brackets, line breaks - a lone CR would be turned into LF by the HTML
// parser) can then be changed on the way through the HTML parser.
function decodeSource(value) {
  try { return decodeURIComponent(value || ''); } catch (e) { return value || ''; }
}

export function protectMacros(html) {
  if (html.indexOf('{{') === -1) return html;
  return html.replace(PROTECT_RE, function(whole, code, escaped, macro) {
    if (code || escaped) return whole;
    return '<span data-redmine-macro="' + encodeURIComponent(macro) + '" class="tiptap-macro">'
      + escapeHtml(macroLabel(macro)) + '</span>';
  });
}

// The macros of the element (it is a detached copy of the editor's HTML) back
// to text. Returns the HTML of the element; format, if given, is applied to it
// before the macros are put back, so that it never touches their text.
export function restoreMacros(container, format) {
  var sources = [];
  var nonce = Math.random().toString(36).slice(2);
  container.querySelectorAll('span[data-redmine-macro]').forEach(function(span) {
    sources.push(decodeSource(span.getAttribute('data-redmine-macro')));
    span.replaceWith(container.ownerDocument.createTextNode('@@tiptap-macro-' + nonce + '-' + (sources.length - 1) + '@@'));
  });
  var html = container.innerHTML;
  if (format) html = format(html);
  if (!sources.length) return html;
  return html.replace(new RegExp('@@tiptap-macro-' + nonce + '-(\\d+)@@', 'g'), function(token, index) {
    return sources[Number(index)];
  });
}

export const RedmineMacro = Node.create({
  name: 'redmineMacro',
  group: 'inline',
  inline: true,
  atom: true,

  addAttributes() {
    return {
      source: {
        default: '',
        parseHTML: function(el) { return decodeSource(el.getAttribute('data-redmine-macro')); },
        renderHTML: function(attrs) { return { 'data-redmine-macro': encodeURIComponent(attrs.source || '') }; },
      },
    };
  },

  parseHTML() { return [{ tag: 'span[data-redmine-macro]' }]; },

  renderHTML({ node, HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes, { class: 'tiptap-macro' }), macroLabel(node.attrs.source || '')];
  },

  renderText({ node }) { return node.attrs.source || ''; },
});

// --- Inline tags ------------------------------------------------------------
// <sub> and <sup> (they have buttons in the toolbar), and the tags of CKEditor's
// "Styles" list (big, small, typewriter, keyboard, sample, variable, inserted text,
// cited work, quotation, abbreviation). The toolbar of this editor has no buttons
// for the latter; they are here so that a text that has them keeps them.
function tagMark(name, tag, attributes, extra) {
  return Mark.create(Object.assign({
    name: name,

    addAttributes() {
      var attrs = {};
      (attributes || []).forEach(function(attribute) {
        attrs[attribute] = {
          default: null,
          parseHTML: function(el) { return el.getAttribute(attribute); },
          renderHTML: function(values) {
            return values[attribute] ? { [attribute]: values[attribute] } : {};
          },
        };
      });
      return attrs;
    },

    parseHTML() { return [{ tag: tag }]; },
    renderHTML({ HTMLAttributes }) { return [tag, HTMLAttributes, 0]; },
  }, extra || {}));
}

// A mark of the toolbar: it has a toggle command and a key, the button does the
// same as the key. Subscript and superscript exclude each other (a letter cannot
// be both).
function toggledTagMark(name, tag, command, shortcut, excludes) {
  return tagMark(name, tag, [], {
    excludes: excludes,

    addCommands() {
      var commands = {};
      commands[command] = function() {
        return function(props) { return props.commands.toggleMark(name); };
      };
      return commands;
    },

    addKeyboardShortcuts() {
      var editor = this.editor;
      var shortcuts = {};
      shortcuts[shortcut] = function() { return editor.commands[command](); };
      return shortcuts;
    },
  });
}

export const Subscript = toggledTagMark('subscript', 'sub', 'toggleSubscript', 'Mod-,', 'superscript');
export const Superscript = toggledTagMark('superscript', 'sup', 'toggleSuperscript', 'Mod-.', 'subscript');

export const InlineTagMarks = [
  tagMark('htmlBig', 'big'),
  tagMark('htmlSmall', 'small'),
  tagMark('htmlTt', 'tt'),
  tagMark('htmlKbd', 'kbd'),
  tagMark('htmlSamp', 'samp'),
  tagMark('htmlVar', 'var'),
  tagMark('htmlIns', 'ins', ['cite', 'datetime']),
  tagMark('htmlCite', 'cite'),
  tagMark('htmlQ', 'q', ['cite']),
  tagMark('htmlAbbr', 'abbr', ['title']),
  tagMark('htmlAcronym', 'acronym', ['title']),
  tagMark('htmlDfn', 'dfn', ['title']),
];

// --- <iframe> -----------------------------------------------------------------
// An embedded video or the like. In the editor it is shown as a placeholder (the
// page of somebody else is not loaded while a text is edited), in the saved text
// it is the <iframe> it was. The server lets only an http(s) address through and
// sandboxes the frame (see the sanitizer).
var IFRAME_ATTRIBUTES = [
  'src', 'width', 'height', 'frameborder', 'allowfullscreen', 'scrolling',
  'title', 'name', 'allow', 'align', 'marginwidth', 'marginheight',
];

function iframeLabel(attrs) {
  var size = attrs.width && attrs.height ? ' (' + attrs.width + '×' + attrs.height + ')' : '';
  return '▶ iframe: ' + String(attrs.src || '').replace(/^https?:\/\//, '') + size;
}

export const LegacyIframe = Node.create({
  name: 'legacyIframe',
  group: 'inline',
  inline: true,
  atom: true,
  draggable: true,

  addAttributes() {
    var attrs = {};
    IFRAME_ATTRIBUTES.forEach(function(attribute) {
      attrs[attribute] = {
        default: null,
        parseHTML: function(el) { return el.getAttribute(attribute); },
        renderHTML: function(values) {
          return values[attribute] === null || values[attribute] === undefined ? {} : { [attribute]: values[attribute] };
        },
      };
    });
    return attrs;
  },

  parseHTML() { return [{ tag: 'iframe' }]; },
  renderHTML({ HTMLAttributes }) { return ['iframe', HTMLAttributes]; },

  addNodeView() {
    return function(props) {
      var dom = document.createElement('span');
      dom.className = 'tiptap-iframe';
      dom.contentEditable = 'false';
      dom.textContent = iframeLabel(props.node.attrs);
      return { dom: dom };
    };
  },
});

// --- Special container ----------------------------------------------------------
// CKEditor's Styles list has a "Special Container": a <div> with a gray frame
//   <div style="background:#eeeeee;border:1px solid #cccccc;padding:5px 10px;">text</div>
// It is shown as a code block without highlighting, the very same one as
//   <pre><code class="language-plaintext">text</code></pre>
// does: the gray frame is what such a block looks like here. The server does the
// same when it shows a saved text (SPECIAL_CONTAINER_RE in the formatter, keep both
// alike). Only the style of exactly these three declarations counts, a <div> that
// has anything else in its style is an ordinary one, and so is one with another
// <div> or a macro inside (a code block cannot hold a macro, its text would be lost
// on the way).
function styleSignature(text) {
  var probe = document.createElement('div');
  probe.style.cssText = text;
  var parts = [];
  for (var i = 0; i < probe.style.length; i++) {
    parts.push(probe.style[i] + ':' + probe.style.getPropertyValue(probe.style[i]));
  }
  return parts.sort().join(';');
}

// The browser parses the style, so #eee, #eeeeee and rgb(238,238,238) are one value.
var SPECIAL_CONTAINER_SIGNATURE = styleSignature('background:#eeeeee;border:1px solid #cccccc;padding:5px 10px');

// The content of the container as the text of a code block: a line break and the
// end of a block begin a new line, spaces are collapsed the way a browser shows
// them, the inline formatting (bold, links, colors) stays, the block tags go.
function containerCode(html) {
  return html
    .replace(/[ \t\r\n\f]+/g, ' ')
    .replace(/ ?<br\b[^>]*> ?/gi, '\n')
    .replace(/ ?<\/(?:p|div|h[1-6]|li|blockquote|address|pre)> ?/gi, '\n')
    .replace(/ ?<\/?(?:p|div|h[1-6]|ul|ol|li|blockquote|address|pre)\b[^>]*> ?/gi, '')
    .replace(/^[ \n]+|[ \n]+$/g, '');
}

export function convertSpecialContainers(container) {
  // made in the document of the container: the text being loaded is kept in one that loads nothing
  var doc = container.ownerDocument;
  container.querySelectorAll('div[style]').forEach(function(div) {
    if (div.querySelector('div, [data-redmine-macro]')) return;
    if (styleSignature(div.getAttribute('style')) !== SPECIAL_CONTAINER_SIGNATURE) return;
    var code = doc.createElement('code');
    code.className = 'language-plaintext';
    code.innerHTML = containerCode(div.innerHTML);
    var pre = doc.createElement('pre');
    pre.appendChild(code);
    div.replaceWith(pre);
  });
}

// --- <div> and <address> -------------------------------------------------------
// A <div> (CKEditor's "Normal (DIV)" format, its "Create Div Container", the block
// styles with a frame or a background) and an <address> used to turn into paragraphs
// as soon as a text was opened in the editor. They are kept now, as two nodes that
// write the very tag they read: one that holds text (LegacyBlock) and one that holds
// blocks (LegacyContainer); the style and the other attributes stay, like those of
// the other legacy elements. There is no button for them, they exist for the texts
// that have them.
//
// What comes from outside the editor (pasted or dropped: a web page, Word, a mail
// are full of <div>s that mean nothing here) is not given these nodes, its <div>s
// become paragraphs as they always did; text copied inside the editor keeps them.
var BLOCK_TAGS = /^(?:address|blockquote|details|div|figure|h[1-6]|hr|ol|p|pre|table|ul)$/;

function hasBlockChild(el) {
  return Array.prototype.some.call(el.children, function(child) { return BLOCK_TAGS.test(child.localName); });
}

// The <div>s that other nodes of the editor write for themselves: the content of a
// task item, of a collapsible block, the header and the body of a quote.
function ownedByNode(el) {
  var parent = el.parentElement;
  return el.hasAttribute('data-type') || /(?:^|\s)tiptap-/.test(el.className || '')
    || !!(parent && parent.getAttribute('data-type') === 'taskItem');
}

// A list item starts with a paragraph, so a <div> that is the first thing in an <li>
// has no place there (the parser would put it after the list): it stays what it
// was before, its content goes into the item.
function startsListItem(el) {
  var parent = el.parentElement;
  if (!parent || parent.localName !== 'li') return false;
  for (var node = el.previousSibling; node; node = node.previousSibling) {
    if (node.nodeType === 1 || (node.nodeType === 3 && /\S/.test(node.nodeValue))) return false;
  }
  return true;
}

function divNode(name, content, withBlocks) {
  return Node.create({
    name: name,
    group: 'block',
    content: content,
    defining: true,

    addAttributes() {
      return {
        tag: {
          default: 'div',
          parseHTML: function(el) { return el.localName; },
          renderHTML: function() { return {}; },
        },
      };
    },

    parseHTML() {
      return ['div', 'address'].map(function(tag) {
        return {
          tag: tag,
          priority: 10,   // below the rules of the nodes that take a <div> for theirs
          getAttrs: function(el) {
            return (ownedByNode(el) || startsListItem(el) || hasBlockChild(el) !== withBlocks) ? false : null;
          },
        };
      });
    },

    renderHTML({ node, HTMLAttributes }) { return [node.attrs.tag, HTMLAttributes, 0]; },
  });
}

export const LegacyBlock = divNode('legacyBlock', 'inline*', false);
export const LegacyContainer = divNode('legacyContainer', 'block+', true);

// The <div>s and <address>es of a foreign text as the editor read them before: a
// block with blocks in it is taken apart, a block with text in it is a paragraph.
export function flattenForeignDivs(container) {
  // innermost first
  Array.prototype.slice.call(container.querySelectorAll('div, address')).reverse().forEach(function(el) {
    if (hasBlockChild(el)) {
      while (el.firstChild) el.parentNode.insertBefore(el.firstChild, el);
      el.remove();
    } else {
      var paragraph = container.ownerDocument.createElement('p');
      while (el.firstChild) paragraph.appendChild(el.firstChild);
      el.replaceWith(paragraph);
    }
  });
}

export const LegacyPaste = Extension.create({
  name: 'legacyPaste',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('legacyPaste'),
        props: {
          transformPastedHTML(html) {
            // ProseMirror marks what was copied inside the editor
            if (html.indexOf('data-pm-slice') !== -1 || !/<(?:div|address)\b/i.test(html)) return html;
            var holder = inertElement();     // loads nothing: the editor shows the pictures itself
            holder.innerHTML = html;
            flattenForeignDivs(holder);
            return holder.innerHTML;
          },
        },
      }),
    ];
  },
});

// --- Attributes of known elements ----------------------------------------------
// What CKEditor puts on elements the editor knows already, but whose attributes
// it has no place for: the style of a heading (color), of a table, of a cell
// (background, vertical alignment, width), of a paragraph (clear), of a picture
// (float, margins, frame), border/cellpadding/cellspacing/align of a table, the
// border and alignment of a picture. They are kept as they were.
function splitDeclarations(text) {
  var parts = [];
  var current = '';
  var quote = '';
  var depth = 0;
  for (var i = 0; i < text.length; i++) {
    var ch = text.charAt(i);
    if (quote) {
      if (ch === quote) quote = '';
    } else if (ch === '"' || ch === "'") {
      quote = ch;
    } else if (ch === '(') {
      depth++;
    } else if (ch === ')') {
      depth = Math.max(0, depth - 1);
    } else if (ch === ';' && depth === 0) {
      parts.push(current);
      current = '';
      continue;
    }
    current += ch;
  }
  parts.push(current);
  return parts.map(function(part) { return part.trim(); }).filter(Boolean);
}

// The properties a style may keep here: those the server keeps as well (CSS_PROPERTIES
// in lib/redmine/wiki_formatting/tiptap/sanitizer.rb). A text is shown on the page of
// the editor before the server has cleaned it, so a style from a text that somebody
// else stored must not be able to place anything over that page (position, z-index)
// or load anything (url()).
var KEPT_PROPERTIES = new RegExp('^(?:color|background(?:-color)?'
  + '|font(?:-family|-size|-weight|-style|-variant)?|text-(?:align|decoration|indent)'
  + '|vertical-align|white-space|letter-spacing|line-height|direction|unicode-bidi'
  + '|margin(?:-(?:top|right|bottom|left))?|padding(?:-(?:top|right|bottom|left))?'
  + '|border(?:-(?:top|right|bottom|left))?(?:-(?:color|style|width))?|border-(?:collapse|spacing)'
  + '|float|clear|width|min-width|max-width|height|list-style-type)$');
var UNSAFE_VALUE = /url\s*\(|expression\s*\(|javascript:|behavior|binding|@import|\\/i;

// The style of the element without the properties that other attributes of the
// node already keep (the alignment, the indent, the width of a picture), and
// without what is not safe to keep (see above).
var PIXELS = /^\d+(?:\.\d+)?px$/i;

function leftoverStyle(el, handled) {
  var kept = splitDeclarations(el.getAttribute('style') || '').filter(function(declaration) {
    var colon = declaration.indexOf(':');
    if (colon < 1) return false;
    var property = declaration.slice(0, colon).trim().toLowerCase();
    var value = declaration.slice(colon + 1).trim();
    // The width and the height of a picture are kept by the picture itself (Image in
    // tiptap_extensions.js), but only when they are in pixels: 50% or auto stay here.
    var size = (property === 'width' || property === 'height') && !PIXELS.test(value.replace(/\s*!important$/i, ''));
    return (handled.indexOf(property) === -1 || size)
      && KEPT_PROPERTIES.test(property)
      && !UNSAFE_VALUE.test(value);
  });
  return kept.length ? kept.join('; ') : null;
}

// An attribute of the node that is the HTML attribute of the same value, under
// another name in the document (data-rich-file-id is dataRichFileId there).
function plainAttribute(htmlName, key) {
  return {
    default: null,
    keepOnSplit: false,
    parseHTML: function(el) { return el.getAttribute(htmlName); },
    renderHTML: function(values) { return values[key] ? { [htmlName]: values[key] } : {}; },
  };
}

function styleAttribute(handled, indented) {
  return {
    default: null,
    keepOnSplit: false,
    parseHTML: function(el) {
      var skip = handled.slice();
      // margin-left is the indent of a paragraph, when it is a whole number of steps
      if (indented && indentOf(el) > 0) skip.push('margin-left');
      return leftoverStyle(el, skip);
    },
    renderHTML: function(values) { return values.legacyStyle ? { style: values.legacyStyle } : {}; },
  };
}

function legacyAttrs(handled, plain, indented) {
  var attributes = { legacyStyle: styleAttribute(handled, indented) };
  (plain || []).forEach(function(htmlName) {
    var key = htmlName.replace(/-(\w)/g, function(match, ch) { return ch.toUpperCase(); });
    attributes[key] = plainAttribute(htmlName, key);
  });
  return attributes;
}

// What a table of CKEditor has that a table of this editor has not: a caption
// (becomes a centered paragraph above the table) and a footer written before the
// body (a browser shows it at the bottom whatever the source order is).
export function flattenTableExtras(container) {
  container.querySelectorAll('table').forEach(function(table) {
    var caption = table.querySelector(':scope > caption');
    if (caption) {
      var paragraph = container.ownerDocument.createElement('p');
      paragraph.setAttribute('style', 'text-align: center');
      paragraph.innerHTML = caption.innerHTML;
      table.parentNode.insertBefore(paragraph, table);
      caption.remove();
    }
    var footer = table.querySelector(':scope > tfoot');
    if (footer) table.appendChild(footer);
  });
}

export const LegacyAttributes = Extension.create({
  name: 'legacyAttributes',

  addGlobalAttributes() {
    return [
      {
        types: ['paragraph', 'heading'],
        attributes: legacyAttrs(['text-align'], [], true),
      },
      {
        // nothing of their style is kept by another attribute: all of it stays as it was
        types: ['legacyBlock', 'legacyContainer'],
        attributes: legacyAttrs([], ['align', 'dir', 'lang', 'title'], false),
      },
      {
        types: ['table'],
        attributes: legacyAttrs([], ['border', 'cellpadding', 'cellspacing', 'align', 'width']),
      },
      {
        types: ['tableCell', 'tableHeader'],
        attributes: legacyAttrs(['font-size', 'white-space', 'text-align'], ['valign']),
      },
      {
        types: ['image'],
        attributes: legacyAttrs(['width', 'height'], ['border', 'align', 'data-rich-file-id']),
      },
    ];
  },
});
