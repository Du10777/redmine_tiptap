import { lowlight, textTokens, paintTokens } from './tiptap_codeblock.js';

// The source mode (the <HTML> button): the HTML of the text in a plain textarea, with
// its syntax colored by the highlighter of the code blocks ("HTML / XML" in their
// list), so that tags, attributes and strings can be told apart at a glance.
//
// A textarea cannot color its text, so the colored text is a copy of it lying under
// the textarea: a <pre> of the same size, font and wrapping. The textarea's own text
// is made transparent (the caret and the selection stay), and the copy scrolls along
// with it and is rebuilt on every change.
var LANGUAGE = 'xml';

// A text longer than this (characters) is not colored, the textarea shows it as it is.
var COLOR_LIMIT = 300000;
// Up to this length the colors are redone on every key. A longer text is shown
// uncolored at once, and colored when the typing pauses: highlighting it takes long
// enough to be felt on every key.
var LIVE_LIMIT = 30000;
var PAUSE = 200;   // ms

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

  // After the text has changed (or the box has been shown).
  function refresh() {
    clearTimeout(timer);
    var text = area.value;
    var plain = text.length > COLOR_LIMIT || !lowlight.registered(LANGUAGE);
    // Without colors the textarea shows its own text.
    box.classList.toggle('tiptap-source-plain', plain);
    if (plain) return;

    place();
    // The textarea has a line after a final line break, a <pre> has not: without
    // something on it the copy would be a line shorter and could not scroll as far.
    code.textContent = /\n$/.test(text) ? text + ' ' : text;
    if (text.length <= LIVE_LIMIT) {
      paintTokens(code, textTokens(LANGUAGE, text));
    } else {
      // Any change comes through here again and cancels this.
      timer = setTimeout(function() { paintTokens(code, textTokens(LANGUAGE, text)); }, PAUSE);
    }
    scroll();
  }

  area.addEventListener('input', refresh);
  area.addEventListener('scroll', scroll);

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
      if (visible) refresh();
    },
    isShown: function() { return box.style.display !== 'none'; },
    refresh: refresh,
  };
}
