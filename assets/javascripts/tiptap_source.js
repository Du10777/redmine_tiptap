import { lowlight, textTokens } from './tiptap_codeblock.js';
import { inertElement } from './tiptap_inert.js';

// The source mode (the <HTML> button): the HTML of the text in a plain textarea, with
// its syntax colored by the highlighter of the code blocks ("HTML / XML" in their
// list), so that tags, attributes and strings can be told apart at a glance, and
// written the way a person would write it (formatSourceHTML below).
//
// A textarea cannot color its text, so the colored text is a copy of it lying under
// the textarea: a <pre> of the same size, font and wrapping. The textarea's own text
// is made transparent (the caret and the selection stay), and the copy scrolls along
// with it.
//
// It is done the way the code blocks of the editor do it (tiptap_codeblock.js): a key
// does not re-color anything. The change is made in the copy at once, in the text it
// already has, so the letters stay where they are and a typed letter takes the color
// of its neighbors; the coloring is redone 50 ms after the typing pauses, and only
// for what is on the screen and a screen above and below it (the highlighter and
// the layout of colored pieces of text are what costs time: 100 000 characters take
// 0.4 s, a weak laptop needs four times that). The rest of the text is in the copy
// uncolored and gets its colors when it is scrolled to. A text of any length is
// colored this way; what is on the screen is what costs.
var LANGUAGE = 'xml';

var PAUSE = 50;          // ms of a pause in typing or in scrolling before the coloring is done
var FULL_LIMIT = 8000;   // up to this many characters the whole text is colored, no matter what is on the screen
var SHIFT_LIMIT = 50000;    // over this many characters the copy is not changed key by key (see change())
var HUGE = 2000000;      // over this many characters there is no copy at all, the textarea shows its text
var MARGIN = 1;          // screens colored above and below what is seen
var NEAR = 40000;        // how far (characters) the coloring may start before / go on after the part it is asked for
var ZWSP = '​';     // the last character of the copy, see below

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
  var holder = inertElement();
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
  // the text as it is stored: its pictures are given by bare file names, nothing must load
  var holder = inertElement();
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

  // The copy always holds the text of the textarea and one more character at the end,
  // a zero-width space: the textarea has a line after a final line break and a <pre>
  // has not, so without something on that line the copy would be a line shorter
  // and could not scroll as far.
  var shown = null;      // the text the copy holds (without that character); null: the copy is not kept up to date
  var colored = null;    // { from, to }: the part of the text that is colored
  var typingTimer = null;
  var scrollTimer = null;
  var range = document.createRange();

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

  // --- Where a character of the text is in the copy ---------------------------
  // The text nodes of the copy with the position of the first character of each.
  function textNodes() {
    var list = [];
    var start = 0;
    var walker = document.createTreeWalker(code, NodeFilter.SHOW_TEXT);
    for (var node = walker.nextNode(); node; node = walker.nextNode()) {
      list.push({ node: node, start: start });
      start += node.length;
    }
    return list;
  }

  // The node and the offset in it of a position of the text. A position between two
  // nodes is the end of the first one.
  function locate(list, offset) {
    var lo = 0;
    var hi = list.length - 1;
    while (lo < hi) {
      var mid = (lo + hi + 1) >> 1;
      if (list[mid].start < offset) lo = mid; else hi = mid - 1;
    }
    return { node: list[lo].node, offset: Math.min(offset - list[lo].start, list[lo].node.length) };
  }

  // Where the character number i is on the screen.
  function rectAt(list, i) {
    var position = locate(list, i + 1);
    range.setStart(position.node, Math.max(0, position.offset - 1));
    range.setEnd(position.node, position.offset);
    return range.getClientRects()[0] || range.getBoundingClientRect();
  }

  // The first number in [0, count) for which test is true, count if there is none.
  function firstWhere(count, test) {
    var lo = 0;
    var hi = count;
    while (lo < hi) {
      var mid = (lo + hi) >> 1;
      if (test(mid)) hi = mid; else lo = mid + 1;
    }
    return lo;
  }

  // The coloring starts at the line that begins with a tag (what the formatting makes
  // of the blocks of the top level), and ends where such a line begins: the highlighter
  // is not in the middle of a comment or a tag there.
  function safeStart(text, index) {
    if (index <= NEAR) return 0;
    var line = text.lastIndexOf('\n<', index);
    if (line !== -1 && index - line <= NEAR) return line + 1;
    var tag = text.lastIndexOf('<', index);
    return tag !== -1 && index - tag <= NEAR ? tag : index;
  }

  function safeEnd(text, index) {
    if (text.length - index <= NEAR) return text.length;
    var line = text.indexOf('\n<', index);
    if (line !== -1 && line - index <= NEAR) return line + 1;
    var tag = text.indexOf('>', index);
    return tag !== -1 && tag - index <= NEAR ? tag + 1 : index + NEAR;
  }

  // The part of the text to color: what is on the screen and a screen above and below.
  function visibleWindow(text) {
    var list = textNodes();
    var view = mirror.getBoundingClientRect();
    var top = view.top - view.height * MARGIN;
    var bottom = view.bottom + view.height * MARGIN;
    var count = text.length + 1;
    var first = firstWhere(count, function(i) { return rectAt(list, i).bottom >= top; });
    var last = firstWhere(count, function(i) { return rectAt(list, i).top > bottom; });
    return [safeStart(text, first), safeEnd(text, Math.min(last, text.length))];
  }

  // Whether what is on the screen is inside the colored part.
  function covered() {
    var list = textNodes();
    var view = mirror.getBoundingClientRect();
    var length = area.value.length;
    return (colored.from === 0 || rectAt(list, colored.from).top <= view.top)
      && (colored.to >= length || rectAt(list, colored.to - 1).bottom >= view.bottom);
  }

  // --- Keeping the copy ----------------------------------------------------------
  // The copy holds the text uncolored, as one piece.
  function setPlain(text) {
    code.textContent = text + ZWSP;
    shown = text;
    colored = null;
  }

  // The copy gets the change that was made in the textarea: what was between the same
  // beginning and the same end of the old and the new text is replaced. The pieces of
  // the copy that are not touched keep their colors. Whether the copy has the new text
  // after that is checked; if it does not, false.
  function shift(text) {
    var old = shown;
    var max = Math.min(old.length, text.length);
    var start = 0;
    var end = 0;
    while (start < max && old.charCodeAt(start) === text.charCodeAt(start)) start++;
    while (end < max - start && old.charCodeAt(old.length - 1 - end) === text.charCodeAt(text.length - 1 - end)) end++;
    var removed = old.length - start - end;
    var added = text.slice(start, text.length - end);

    var list = textNodes();
    if (!list.length) return false;
    var from = locate(list, start);
    range.setStart(from.node, from.offset);
    range.collapse(true);
    if (removed) {
      var to = locate(list, start + removed);
      range.setEnd(to.node, to.offset);
      range.deleteContents();
    }
    if (added) {
      var at = range.startContainer;
      if (at.nodeType === 3) at.insertData(range.startOffset, added);
      else range.insertNode(document.createTextNode(added));
    }
    return code.textContent === text + ZWSP;
  }

  // --- Coloring ------------------------------------------------------------------
  function color() {
    clearTimeout(typingTimer);
    clearTimeout(scrollTimer);
    var text = area.value;
    // Without colors the textarea shows its own text.
    var plain = text.length > HUGE || !lowlight.registered(LANGUAGE);
    box.classList.toggle('tiptap-source-plain', plain);
    if (plain) {
      shown = null;
      return;
    }

    if (shown !== text) setPlain(text);
    place();
    scroll();

    var from = 0;
    var to = text.length;
    if (text.length > FULL_LIMIT) {
      var part = visibleWindow(text);
      from = part[0];
      to = part[1];
    }
    var piece = text.slice(from, to);
    code.textContent = text.slice(0, from);
    code.insertAdjacentHTML('beforeend', coloredHTML(piece, textTokens(LANGUAGE, piece)));
    code.appendChild(document.createTextNode(text.slice(to) + ZWSP));
    colored = { from: from, to: to };
    scroll();
  }

  // The text has changed by typing (or pasting, cutting, undoing).
  function change() {
    var text = area.value;
    clearTimeout(typingTimer);
    if (text.length > HUGE || !lowlight.registered(LANGUAGE)) {
      box.classList.add('tiptap-source-plain');
      shown = null;
      return;
    }

    if (text.length > SHIFT_LIMIT) {
      // The layout of such a text in two places costs more than a key may: the
      // textarea shows its own text until the typing pauses.
      box.classList.add('tiptap-source-plain');
      shown = null;
    } else {
      box.classList.remove('tiptap-source-plain');
      if (shown === null || !shift(text)) setPlain(text);
      else shown = text;
    }
    typingTimer = setTimeout(color, PAUSE);
  }

  // The text is scrolled: what has come into view is colored when the scrolling pauses.
  function scrolled() {
    scroll();
    clearTimeout(scrollTimer);
    if (!colored || shown === null || (colored.from === 0 && colored.to >= shown.length)) return;
    scrollTimer = setTimeout(function() {
      if (!covered()) color();
    }, PAUSE);
  }

  area.addEventListener('input', change);
  area.addEventListener('scroll', scrolled);
  area.addEventListener('keydown', onEnter);

  // The size follows the handle that resizes the editor, and the window.
  if (window.ResizeObserver) {
    new window.ResizeObserver(function() {
      if (box.style.display === 'none') return;
      place();
      scrolled();
    }).observe(area);
  }

  // The text was set from outside: everything is made again.
  function reset() {
    shown = null;
    color();
  }

  return {
    box: box,
    area: area,
    show: function(visible) {
      box.style.display = visible ? 'block' : 'none';
      if (visible) reset();
    },
    isShown: function() { return box.style.display !== 'none'; },
    refresh: reset,
  };
}
