import { Extension } from '@tiptap/core';

const MAX_INDENT = 8;
const STEP = 30; // px per level

// The indent of an element in levels: its margin-left, when that is a whole number
// of levels in pixels (what this editor writes). Any other margin (CKEditor indents
// by 40px) is not an indent of this editor, it stays a plain style of the element
// and is kept as it was (see tiptap_legacy.js) instead of being rounded to a level.
export function indentOf(element) {
  var match = /^(\d+(?:\.\d+)?)px$/.exec(element.style.marginLeft || '');
  var margin = match ? parseFloat(match[1]) : 0;
  return margin > 0 && margin % STEP === 0 ? margin / STEP : 0;
}

export const Indent = Extension.create({
  name: 'indent',

  addOptions() {
    return { types: ['paragraph', 'heading'] };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            default: 0,
            parseHTML: element => indentOf(element),
            renderHTML: attributes => {
              if (!attributes.indent) return {};
              return { style: 'margin-left: ' + (attributes.indent * STEP) + 'px !important' };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    var types = this.options.types;
    // One level more (step 1, up to MAX_INDENT) or less (step -1, down to 0) for the block
    // the cursor is in.
    function stepIndent(step) {
      return ({ editor, chain }) => {
        var applied = false;
        types.forEach(function(type) {
          if (editor.isActive(type)) {
            var cur = editor.getAttributes(type).indent || 0;
            var next = step > 0 ? Math.min(cur + step, MAX_INDENT) : Math.max(cur + step, 0);
            chain().updateAttributes(type, { indent: next }).run();
            applied = true;
          }
        });
        return applied;
      };
    }
    return {
      indent: () => stepIndent(1),
      outdent: () => stepIndent(-1),
    };
  },
});
