import { Extension } from '@tiptap/core';

export const WEB_SAFE_FONTS = [
  'Arial',
  'Arial Black',
  'Comic Sans MS',
  'Courier New',
  'Georgia',
  'Impact',
  'Lucida Console',
  'Lucida Sans Unicode',
  'Palatino Linotype',
  'Tahoma',
  'Times New Roman',
  'Trebuchet MS',
  'Verdana',
];

export const FONT_SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 72];

// The attribute of the text style (a <span style="...">) for one CSS property: name is its
// name in the editor and in element.style, property its name in CSS.
function styleAttribute(name, property) {
  var attributes = {};
  attributes[name] = {
    default: null,
    parseHTML: element => element.style[name] || null,
    renderHTML: attrs => (attrs[name] ? { style: property + ': ' + attrs[name] } : {}),
  };
  return attributes;
}

// Extension for font size (via style="font-size: Xpx")
export const FontSize = Extension.create({
  name: 'fontSize',

  addOptions() {
    return { types: ['textStyle'] };
  },

  addGlobalAttributes() {
    return [{ types: this.options.types, attributes: styleAttribute('fontSize', 'font-size') }];
  },

  addCommands() {
    return {
      setFontSize: size => ({ chain }) => {
        return chain().setMark('textStyle', { fontSize: size ? size + 'px' : null }).run();
      },
      // removeEmptyTextStyle: a span left with no style at all goes, as TipTap's own
      // unsetColor does (otherwise the saved text kept an empty <span>).
      unsetFontSize: () => ({ chain }) => {
        return chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run();
      },
    };
  },
});

// Extension for background color (highlight via style="background-color: X")
export const BackgroundColor = Extension.create({
  name: 'backgroundColor',

  addOptions() {
    return { types: ['textStyle'] };
  },

  addGlobalAttributes() {
    return [{ types: this.options.types, attributes: styleAttribute('backgroundColor', 'background-color') }];
  },

  addCommands() {
    return {
      setBackgroundColor: color => ({ chain }) => {
        return chain().setMark('textStyle', { backgroundColor: color || null }).run();
      },
      unsetBackgroundColor: () => ({ chain }) => {
        return chain().setMark('textStyle', { backgroundColor: null }).removeEmptyTextStyle().run();
      },
    };
  },
});
