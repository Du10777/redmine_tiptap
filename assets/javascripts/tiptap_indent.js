import { Extension } from '@tiptap/core';

const MAX_INDENT = 8;
const STEP = 30; // px на уровень

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
            parseHTML: element => {
              var ml = parseInt(element.style.marginLeft);
              return ml ? Math.round(ml / STEP) : 0;
            },
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
