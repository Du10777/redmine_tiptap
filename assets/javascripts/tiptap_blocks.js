// Helpers shared by the toolbar blocks that wrap the selection into a new block
// (the quote and the collapsible block).

// The body of the new block, built from the current selection: every block node of
// the selection is kept, anything inline is wrapped in a paragraph. An empty selection,
// or one that yields nothing, gives a single paragraph with the fallback text.
export function blocksFromSelection(state, fallbackText) {
  var paragraph = state.schema.nodes.paragraph;
  var fallback = [paragraph.create(null, state.schema.text(fallbackText))];
  if (state.selection.empty) return fallback;

  var nodes = [];
  state.selection.content().content.forEach(function(node) {
    nodes.push(node.type.isBlock ? node : paragraph.create(null, node));
  });
  return nodes.length > 0 ? nodes : fallback;
}

// Replaces the selection with the block (removing the selected content first, as the
// callers did), then applies it.
export function replaceSelectionWithBlock(editor, block) {
  var state = editor.view.state;
  var tr = state.tr;
  if (!state.selection.empty) tr = tr.deleteSelection();
  tr = tr.replaceSelectionWith(block);
  editor.view.dispatch(tr);
}
