import BaseTableCell from '@tiptap/extension-table-cell';
import BaseTableHeader from '@tiptap/extension-table-header';

function cellStyleAttrs(parent) {
  return {
    ...parent,
    cellStyle: {
      default: null,
      parseHTML: el => {
        var keep = [];
        if (el.style.fontSize) keep.push('font-size: ' + el.style.fontSize);
        if (el.style.whiteSpace) keep.push('white-space: ' + el.style.whiteSpace);
        if (el.style.textAlign) keep.push('text-align: ' + el.style.textAlign);
        return keep.length ? keep.join('; ') : null;
      },
      renderHTML: attrs => attrs.cellStyle ? { style: attrs.cellStyle } : {},
    },
  };
}

export const StyledTableCell = BaseTableCell.extend({
  addAttributes() {
    return cellStyleAttrs(this.parent?.());
  },
});

export const StyledTableHeader = BaseTableHeader.extend({
  addAttributes() {
    return cellStyleAttrs(this.parent?.());
  },
});
