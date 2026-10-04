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
    return {
      indent: () => ({ editor, chain }) => {
        var types = this.options.types;
        var applied = false;
        types.forEach(function(type) {
          if (editor.isActive(type)) {
            var cur = editor.getAttributes(type).indent || 0;
            chain().updateAttributes(type, { indent: Math.min(cur + 1, MAX_INDENT) }).run();
            applied = true;
          }
        });
        return applied;
      },
      outdent: () => ({ editor, chain }) => {
        var types = this.options.types;
        var applied = false;
        types.forEach(function(type) {
          if (editor.isActive(type)) {
            var cur = editor.getAttributes(type).indent || 0;
            chain().updateAttributes(type, { indent: Math.max(cur - 1, 0) }).run();
            applied = true;
          }
        });
        return applied;
      },
    };
  },
});
