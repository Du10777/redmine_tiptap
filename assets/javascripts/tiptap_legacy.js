import { Extension, Node, Mark, mergeAttributes } from '@tiptap/core';
import { indentOf } from './tiptap_indent.js';

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

function escapeText(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

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
      + escapeText(macroLabel(macro)) + '</span>';
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
    span.replaceWith(document.createTextNode('@@tiptap-macro-' + nonce + '-' + (sources.length - 1) + '@@'));
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
// <sub> and <sup>, and the tags of CKEditor's "Styles" list (big, small,
// typewriter, keyboard, sample, variable, inserted text, cited work, quotation,
// abbreviation). The toolbar of this editor has no buttons for them; they are
// here so that a text that has them keeps them.
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

export const Subscript = tagMark('subscript', 'sub', [], { excludes: 'superscript' });
export const Superscript = tagMark('superscript', 'sup', [], { excludes: 'subscript' });

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
function leftoverStyle(el, handled) {
  var kept = splitDeclarations(el.getAttribute('style') || '').filter(function(declaration) {
    var colon = declaration.indexOf(':');
    if (colon < 1) return false;
    var property = declaration.slice(0, colon).trim().toLowerCase();
    return handled.indexOf(property) === -1
      && KEPT_PROPERTIES.test(property)
      && !UNSAFE_VALUE.test(declaration.slice(colon + 1));
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
      var paragraph = document.createElement('p');
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
