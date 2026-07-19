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

// Расширение для размера шрифта (через style="font-size: Xpx")
export const FontSize = Extension.create({
  name: 'fontSize',

  addOptions() {
    return { types: ['textStyle'] };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize || null,
            renderHTML: attributes => {
              if (!attributes.fontSize) return {};
              return { style: 'font-size: ' + attributes.fontSize };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize: size => ({ chain }) => {
        return chain().setMark('textStyle', { fontSize: size ? size + 'px' : null }).run();
      },
      unsetFontSize: () => ({ chain }) => {
        return chain().setMark('textStyle', { fontSize: null }).run();
      },
    };
  },
});

// Расширение для цвета фона (highlight через style="background-color: X")
export const BackgroundColor = Extension.create({
  name: 'backgroundColor',

  addOptions() {
    return { types: ['textStyle'] };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          backgroundColor: {
            default: null,
            parseHTML: element => element.style.backgroundColor || null,
            renderHTML: attributes => {
              if (!attributes.backgroundColor) return {};
              return { style: 'background-color: ' + attributes.backgroundColor };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setBackgroundColor: color => ({ chain }) => {
        return chain().setMark('textStyle', { backgroundColor: color || null }).run();
      },
      unsetBackgroundColor: () => ({ chain }) => {
        return chain().setMark('textStyle', { backgroundColor: null }).run();
      },
    };
  },
});
