import { Node, mergeAttributes } from '@tiptap/core';
import { t } from './tiptap_i18n.js';
import { blocksFromSelection, replaceSelectionWithBlock } from './tiptap_blocks.js';

// Whether a plain <blockquote> holds nothing but our quote block (directly or
// through more such wrappers). Earlier versions of the plugin produced these:
// StarterKit's Blockquote rule matched blockquote.tiptap-quote first, so every
// time a saved text was opened, the quote got wrapped in one more blockquote.
// The server unwraps them on saved pages too (see Formatter#unwrap_quotes).
function wrapsOnlyQuote(el) {
  if (el.classList.contains('tiptap-quote')) return false;
  var children = Array.prototype.filter.call(el.childNodes, function(node) {
    return !(node.nodeType === 3 && !/\S/.test(node.nodeValue));
  });
  if (children.length !== 1) return false;
  var child = children[0];
  if (child.nodeType !== 1 || child.nodeName !== 'BLOCKQUOTE') return false;
  return child.classList.contains('tiptap-quote') || wrapsOnlyQuote(child);
}

// Quote block: header (who/when/link) + quote body
export const QuoteBlock = Node.create({
  name: 'quoteBlock',
  group: 'block',
  content: 'quoteHeader quoteBody',
  defining: true,

  parseHTML() {
    return [
      // Above StarterKit's Blockquote rule ({tag: 'blockquote'}, priority 50),
      // which would otherwise take our quote for a plain blockquote.
      { tag: 'blockquote.tiptap-quote', priority: 60 },
      // Wrappers left by the old bug: skip them and parse what is inside.
      {
        tag: 'blockquote',
        priority: 55,
        skip: true,
        getAttrs: function(el) { return wrapsOnlyQuote(el) ? null : false; },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['blockquote', mergeAttributes(HTMLAttributes, { class: 'tiptap-quote' }), 0];
  },
});

export const QuoteHeader = Node.create({
  name: 'quoteHeader',
  content: 'inline*',
  defining: true,

  parseHTML() {
    return [{ tag: 'div.tiptap-quote-header' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { class: 'tiptap-quote-header' }), 0];
  },
});

export const QuoteBody = Node.create({
  name: 'quoteBody',
  content: 'block+',
  defining: true,

  parseHTML() {
    return [{ tag: 'div.tiptap-quote-body' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { class: 'tiptap-quote-body' }), 0];
  },
});

export function insertQuote(editor) {
  var schema = editor.view.state.schema;
  var bodyNodes = blocksFromSelection(editor.view.state, t('quote.default_text'));

  var block = schema.nodes.quoteBlock.create(null, [
    schema.nodes.quoteHeader.create(null, schema.text(t('quote.default_header'))),
    schema.nodes.quoteBody.create(null, bodyNodes),
  ]);

  replaceSelectionWithBlock(editor, block);
}
