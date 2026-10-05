import { lowlight, textTokens } from './tiptap_codeblock.js';

// The source mode (the <HTML> button): the HTML of the text in a plain textarea, with
// its syntax colored by the highlighter of the code blocks ("HTML / XML" in their
// list), so that tags, attributes and strings can be told apart at a glance, and
// written the way a person would write it (formatSourceHTML below).
//
// A textarea cannot color its text, so the colored text is a copy of it lying under
// the textarea: a <pre> of the same size, font and wrapping. The textarea's own text
// is made transparent (the caret and the selection stay), and the copy scrolls along
// with it and is rebuilt on every change.
var LANGUAGE = 'xml';

// What coloring costs (measured in Chrome; a weak laptop takes four times as long):
// 10 000 characters 30 ms, 100 000 about 0.4 s, 300 000 about 1 s - the highlighter
// itself takes a third of that, the rest is the browser laying out tens of thousands
// of colored pieces of text. A page of text is about 3 000 characters of HTML.
// A text longer than COLOR_LIMIT characters is not colored, the textarea shows it as it is.
var COLOR_LIMIT = 100000;
// Up to LIVE_LIMIT characters the colors are redone on every key. A longer text shows
// its own uncolored text while it is being typed, and is colored when the typing
// pauses, otherwise every key would be felt.
var LIVE_LIMIT = 10000;
var PAUSE = 250;   // ms

var INDENT = '  ';

// --- Formatting -----------------------------------------------------------------
// The editor gives its HTML as one line. In the source mode a block starts on a line
// of its own and what is inside it is indented one level deeper:
//
//   <p>Text with <strong>bold</strong></p>
//
//   <ul>
//     <li><p>one</p></li>
//     <li>
//       <p>two</p>
//       <ul>
//         <li><p>nested</p></li>
//       </ul>
//     </li>
//   </ul>
//
// A block that holds one block (<li><p>one</p></li>) stays on one line. Between the
// blocks of the top level there is an empty line where one of the two takes more than
// one line. Whitespace is only put where it means nothing to a browser or to the
// editor: between blocks. Text and inline tags are never touched (a space between
// <b>a</b> and <i>b</i> would show), and what is in <pre> is kept as it is. After a
// <br> the text goes on a new line (the whitespace there means nothing either).
// The indent is spaces, not tabs: a tab after an opening tag is one of the signs
// of a text from CKEditor (CKEDITOR_SIGNS in formatter.rb).
var BLOCK = /^(?:address|article|aside|blockquote|caption|col|colgroup|dd|details|div|dl|dt|figcaption|figure|h[1-6]|hr|li|ol|p|pre|section|summary|table|tbody|td|tfoot|th|thead|tr|ul)$/;
// Blocks that stay on the line of the one block inside them.
var WRAPPER = /^(?:blockquote|dd|dt|div|li|td|th)$/;
var VOID_BLOCK = /^(?:col|hr)$/;

function isBlock(node) {
  return node.nodeType === 1 && BLOCK.test(node.localName);
}

function isBlank(node) {
  return node.nodeType === 3 && !/[^ \t\r\n\f]/.test(node.nodeValue);
}

// Not trim(): that would take no-break spaces and the like as well.
function trimWhitespace(text) {
  return text.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g, '');
}

function startTag(el) {
  var tag = el.cloneNode(false).outerHTML;
  return VOID_BLOCK.test(el.localName) ? tag : tag.slice(0, tag.length - el.localName.length - 3);
}

function endTag(el) {
  return VOID_BLOCK.test(el.localName) ? '' : '</' + el.localName + '>';
}

function inlineHTML(nodes) {
  var holder = document.createElement('div');
  nodes.forEach(function(node) { holder.appendChild(node.cloneNode(true)); });
  return holder.innerHTML;
}

// The text after a <br> goes on a new line, at the indent of the line.
function breakLines(html, pad) {
  return html.replace(/<br>[ \t\r\n\f]*(?=[^ \t\r\n\f])/g, '<br>\n' + pad);
}

// The block as one line, if it can be one: a block with nothing but text and inline
// tags in it, or a block that holds one such block; null if it cannot.
function oneLine(el, pad) {
  var name = el.localName;
  if (VOID_BLOCK.test(name)) return startTag(el);
  if (name === 'pre') return /\n/.test(el.textContent) ? null : el.outerHTML;

  var children = Array.prototype.slice.call(el.childNodes);
  var blocks = children.filter(isBlock);
  if (!blocks.length) return startTag(el) + breakLines(inlineHTML(children), pad) + endTag(el);

  if (WRAPPER.test(name) && blocks.length === 1 && children.every(function(node) { return node === blocks[0] || isBlank(node); })) {
    var inner = oneLine(blocks[0], pad);
    if (inner !== null) return startTag(el) + inner + endTag(el);
  }
  return null;
}

function render(el, depth) {
  var pad = new Array(depth + 1).join(INDENT);
  var line = oneLine(el, pad);
  if (line !== null) return pad + line;
  if (el.localName === 'pre') return pad + el.outerHTML;

  var lines = [pad + startTag(el)];
  var run = [];   // text and inline tags that are between the blocks

  function flush() {
    var text = trimWhitespace(inlineHTML(run));
    if (text) lines.push(pad + INDENT + breakLines(text, pad + INDENT));
    run = [];
  }

  Array.prototype.forEach.call(el.childNodes, function(node) {
    if (isBlock(node)) {
      flush();
      lines.push(render(node, depth + 1));
    } else {
      run.push(node);
    }
  });
  flush();
  lines.push(pad + endTag(el));
  return lines.join('\n');
}

export function formatSourceHTML(html) {
  var holder = document.createElement('div');
  holder.innerHTML = html;

  var items = [];   // the blocks of the top level: { text, multi }
  var run = [];

  function flush() {
    var text = trimWhitespace(inlineHTML(run));
    if (text) items.push({ text: breakLines(text, ''), multi: false });
    run = [];
  }

  Array.prototype.forEach.call(holder.childNodes, function(node) {
    if (isBlock(node)) {
      flush();
      items.push({ text: render(node, 0), multi: oneLine(node, '') === null });
    } else {
      run.push(node);
    }
  });
  flush();

  var lines = [];
  items.forEach(function(item, i) {
    if (i && (item.multi || items[i - 1].multi)) lines.push('');
    lines.push(item.text);
  });
  return lines.join('\n');
}

// --- Typing ----------------------------------------------------------------------
// Enter keeps the indent of the line, and goes one level deeper after an opening tag
// of a block; between <ul> and </ul> it opens a line for the content and keeps the
// closing tag on a line of its own.
var OPENS_BLOCK = /<(?:address|article|blockquote|caption|colgroup|dd|details|div|dl|dt|figure|h[1-6]|li|ol|p|section|summary|table|tbody|td|tfoot|th|thead|tr|ul)\b[^<>]*>$/i;

function insertText(area, text) {
  // execCommand keeps the undo history of the textarea; setRangeText is for a browser without it.
  if (document.execCommand && document.execCommand('insertText', false, text)) return;
  area.setRangeText(text, area.selectionStart, area.selectionEnd, 'end');
  area.dispatchEvent(new Event('input', { bubbles: true }));
}

function onEnter(event) {
  if (event.key !== 'Enter' || event.shiftKey || event.ctrlKey || event.metaKey || event.altKey) return;
  if (event.isComposing || event.keyCode === 229) return;

  var area = event.target;
  var value = area.value;
  var start = area.selectionStart;
  var end = area.selectionEnd;
  var lineStart = value.lastIndexOf('\n', start - 1) + 1;
  var before = value.slice(lineStart, start);
  var lineEnd = value.indexOf('\n', end);
  var after = value.slice(end, lineEnd === -1 ? value.length : lineEnd);
  var indent = /^[ \t]*/.exec(before)[0];
  var opens = OPENS_BLOCK.test(before);

  event.preventDefault();
  if (opens && /^<\/[a-z]/i.test(after)) {
    insertText(area, '\n' + indent + INDENT + '\n' + indent);
    var caret = start + 1 + indent.length + INDENT.length;
    area.setSelectionRange(caret, caret);
  } else {
    insertText(area, '\n' + indent + (opens ? INDENT : ''));
  }
}

// --- Coloring --------------------------------------------------------------------
function escapeHTML(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// The text with its tokens (see textTokens in tiptap_codeblock.js) as HTML, built as
// one string: that is several times faster than creating the spans one by one.
function coloredHTML(text, tokens) {
  var parts = [];
  var pos = 0;
  tokens.forEach(function(token) {
    if (token.to <= token.from || token.from < pos) return;
    if (token.from > pos) parts.push(escapeHTML(text.slice(pos, token.from)));
    parts.push('<span class="' + token.cls + '">' + escapeHTML(text.slice(token.from, token.to)) + '</span>');
    pos = token.to;
  });
  if (pos < text.length) parts.push(escapeHTML(text.slice(pos)));
  return parts.join('');
}

// { box, area, show(visible), isShown(), refresh() }: the box is what is shown and
// hidden, the area is the textarea with the HTML (read and set its value; call
// refresh() after setting it).
export function createSourceBox() {
  var box = document.createElement('div');
  box.className = 'tiptap-source-box';
  box.style.display = 'none';

  var mirror = document.createElement('pre');
  mirror.className = 'tiptap-source-mirror';
  mirror.setAttribute('aria-hidden', 'true');
  var code = document.createElement('code');
  mirror.appendChild(code);

  var area = document.createElement('textarea');
  area.className = 'tiptap-source';
  area.spellcheck = false;

  box.appendChild(mirror);
  box.appendChild(area);

  var timer = null;

  // The copy covers the inside of the textarea's border. It is as wide as the text
  // area is: where there is a scrollbar, the text wraps before it, and so must the copy.
  function place() {
    mirror.style.top = area.clientTop + 'px';
    mirror.style.left = area.clientLeft + 'px';
    mirror.style.width = area.clientWidth + 'px';
    mirror.style.height = area.clientHeight + 'px';
  }

  function scroll() {
    mirror.scrollTop = area.scrollTop;
    mirror.scrollLeft = area.scrollLeft;
  }

  // The textarea has a line after a final line break, a <pre> has not: without
  // something on it the copy would be a line shorter and could not scroll as far.
  function tail(text) {
    return /\n$/.test(text) ? ' ' : '';
  }

  // Colors the text now. While the colored copy is not on, the textarea shows its
  // own text (the plain state).
  function paint() {
    clearTimeout(timer);
    var text = area.value;
    var plain = text.length > COLOR_LIMIT || !lowlight.registered(LANGUAGE);
    box.classList.toggle('tiptap-source-plain', plain);
    if (plain) return;

    place();
    code.innerHTML = coloredHTML(text, textTokens(LANGUAGE, text)) + tail(text);
    scroll();
  }

  // After the text has changed by typing.
  function change() {
    if (area.value.length <= LIVE_LIMIT) return paint();
    clearTimeout(timer);
    // The copy is not touched, so a key costs nothing; any other change comes
    // through here again and puts the timer off.
    box.classList.add('tiptap-source-plain');
    timer = setTimeout(paint, PAUSE);
  }

  area.addEventListener('input', change);
  area.addEventListener('scroll', scroll);
  area.addEventListener('keydown', onEnter);

  // The size follows the handle that resizes the editor, and the window.
  if (window.ResizeObserver) {
    new window.ResizeObserver(function() {
      if (box.style.display === 'none') return;
      place();
      scroll();
    }).observe(area);
  }

  return {
    box: box,
    area: area,
    show: function(visible) {
      box.style.display = visible ? 'block' : 'none';
      if (visible) paint();
    },
    isShown: function() { return box.style.display !== 'none'; },
    refresh: paint,
  };
}
