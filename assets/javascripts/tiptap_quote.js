import { Node, mergeAttributes } from '@tiptap/core';

// Блок цитаты: заголовок (кто/когда/ссылка) + тело цитаты
export const QuoteBlock = Node.create({
  name: 'quoteBlock',
  group: 'block',
  content: 'quoteHeader quoteBody',
  defining: true,

  parseHTML() {
    return [{ tag: 'blockquote.tiptap-quote' }];
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
  var state = editor.view.state;
  var sel = state.selection;
  var schema = state.schema;
  var paragraphType = schema.nodes.paragraph;

  var bodyNodes;
  if (sel.empty) {
    bodyNodes = [paragraphType.create(null, schema.text('Текст цитаты'))];
  } else {
    var slice = sel.content();
    var nodes = [];
    slice.content.forEach(function(node) {
      if (node.type.isBlock) {
        nodes.push(node);
      } else {
        nodes.push(paragraphType.create(null, node));
      }
    });
    bodyNodes = nodes.length > 0 ? nodes : [paragraphType.create(null, schema.text('Текст цитаты'))];
  }

  var block = schema.nodes.quoteBlock.create(null, [
    schema.nodes.quoteHeader.create(null, schema.text('Автор, дата')),
    schema.nodes.quoteBody.create(null, bodyNodes),
  ]);

  var tr = state.tr;
  if (!sel.empty) tr = tr.deleteSelection();
  tr = tr.replaceSelectionWith(block);
  editor.view.dispatch(tr);
}
