import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';

// The marker style (disc/circle/square, decimal/roman/...) that both list kinds keep,
// stored and read as the CSS list-style-type.
const listStyleType = {
  default: null,
  parseHTML: element => element.style.listStyleType || null,
  renderHTML: attributes => {
    if (!attributes.listStyleType) return {};
    return { style: 'list-style-type: ' + attributes.listStyleType };
  },
};

export const StyledBulletList = BulletList.extend({
  addAttributes() {
    return { ...this.parent?.(), listStyleType };
  },
});

export const StyledOrderedList = OrderedList.extend({
  addAttributes() {
    return { ...this.parent?.(), listStyleType };
  },
});
