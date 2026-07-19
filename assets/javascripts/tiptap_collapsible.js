export function insertCollapsible(editor) {
  var state = editor.view.state;
  var sel = state.selection;
  var collapsibleContentType = state.schema.nodes.collapsibleContent;
  var paragraphType = state.schema.nodes.paragraph;
  var contentNodes;

  if (sel.empty) {
    contentNodes = [paragraphType.create(null, state.schema.text('Содержимое'))];
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
    contentNodes = nodes.length > 0 ? nodes : [paragraphType.create(null, state.schema.text('Содержимое'))];
  }

  var summaryType = state.schema.nodes.collapsibleSummary;
  var blockType = state.schema.nodes.collapsibleBlock;
  var block = blockType.create(
    { open: true },
    [
      summaryType.create(null, state.schema.text('Заголовок')),
      collapsibleContentType.create(null, contentNodes),
    ]
  );

  var tr = state.tr;
  if (!sel.empty) tr = tr.deleteSelection();
  tr = tr.replaceSelectionWith(block);
  editor.view.dispatch(tr);
}
