import { TextSelection } from '@tiptap/pm/state';
import { t } from './tiptap_i18n.js';
import { blocksFromSelection, replaceSelectionWithBlock } from './tiptap_blocks.js';

export function insertCollapsible(editor) {
  var schema = editor.view.state.schema;
  var contentNodes = blocksFromSelection(editor.view.state, t('collapsible.default_content'));

  var block = schema.nodes.collapsibleBlock.create({ open: true }, [
    schema.nodes.collapsibleSummary.create(null, schema.text(t('collapsible.default_title'))),
    schema.nodes.collapsibleContent.create(null, contentNodes),
  ]);

  replaceSelectionWithBlock(editor, block);
}

// Takes the collapsible block at pos away and keeps what was in it: the title becomes
// a line of its own (an empty title is dropped), the content stays as it was. One
// step, so Ctrl+Z brings the block back. The cursor stays at its place in the text if
// it was in the block, otherwise it goes to the start of the text of the block.
export function unwrapCollapsible(editor, pos) {
  var state = editor.view.state;
  var block = state.doc.nodeAt(pos);
  if (!block || block.type.name !== 'collapsibleBlock') return false;
  var title = block.child(0), body = block.child(1);

  var keepTitle = false;
  title.forEach(function(node) {
    if (!node.isText || /\S/.test(node.text)) keepTitle = true;
  });
  var nodes = keepTitle ? [state.schema.nodes.paragraph.create(null, title.content)] : [];
  body.forEach(function(node) { nodes.push(node); });

  // The new paragraph is as long as the title was, so the text after it moves by
  // the size of the two wrappers that go.
  var titleStart = pos + 2, bodyStart = pos + 2 + title.nodeSize;
  var newBodyStart = pos + (keepTitle ? title.nodeSize : 0);
  var cursor = state.selection.from, target = pos + 1;
  if (cursor >= titleStart && cursor <= titleStart + title.content.size) {
    if (keepTitle) target = pos + 1 + (cursor - titleStart);
  } else if (cursor >= bodyStart && cursor <= bodyStart + body.content.size) {
    target = newBodyStart + (cursor - bodyStart);
  }

  var tr = state.tr.replaceWith(pos, pos + block.nodeSize, nodes);
  tr.setSelection(TextSelection.near(tr.doc.resolve(Math.min(target, tr.doc.content.size))));
  editor.view.dispatch(tr.scrollIntoView());
  editor.view.focus();
  return true;
}
