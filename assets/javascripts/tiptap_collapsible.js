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
