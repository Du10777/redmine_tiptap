import { Node, mergeAttributes } from '@tiptap/core';
import BaseImage from '@tiptap/extension-image';
export { FontSize, BackgroundColor, WEB_SAFE_FONTS, FONT_SIZES } from './tiptap_formatting.js';
export { QuoteBlock, QuoteHeader, QuoteBody } from './tiptap_quote.js';
export { StyledBulletList, StyledOrderedList } from './tiptap_lists.js';
export { TaskList } from '@tiptap/extension-task-list';
export { TaskItem } from '@tiptap/extension-task-item';
export { TextStyle } from '@tiptap/extension-text-style';
export { Color } from '@tiptap/extension-color';
export { FontFamily } from '@tiptap/extension-font-family';
export { Underline } from '@tiptap/extension-underline';
export { TextAlign } from '@tiptap/extension-text-align';
export { default as Link } from '@tiptap/extension-link';
export { Table } from '@tiptap/extension-table';
export { TableRow } from '@tiptap/extension-table-row';
export { StyledTableHeader as TableHeader, StyledTableCell as TableCell } from './tiptap_table_cell.js';
export { Indent } from './tiptap_indent.js';
export { FormattableCodeBlock } from './tiptap_codeblock.js';

export const Image = BaseImage.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      filename: {
        default: null,
        parseHTML: element => element.getAttribute('data-filename'),
        renderHTML: attributes => {
          if (!attributes.filename) return {};
          return { 'data-filename': attributes.filename };
        },
      },
      width: {
        default: null,
        parseHTML: element => element.style.width ? parseInt(element.style.width) : null,
        renderHTML: attributes => {
          if (!attributes.width) return {};
          return { style: 'width: ' + attributes.width + 'px' };
        },
      },
    };
  },

  addNodeView() {
    return ({ node, getPos, editor }) => {
      var dom = document.createElement('div');
      dom.className = 'tiptap-image-wrapper';
      dom.style.display = 'inline-block';
      dom.style.position = 'relative';
      dom.style.userSelect = 'none';

      var img = document.createElement('img');
      img.src = node.attrs.src;
      img.alt = node.attrs.alt || '';
      if (node.attrs.width) img.style.width = node.attrs.width + 'px';
      if (node.attrs['data-filename']) img.setAttribute('data-filename', node.attrs['data-filename']);
      dom.appendChild(img);

      var handles = ['nw', 'ne', 'sw', 'se'];
      var handleEls = {};

      handles.forEach(function(pos) {
        var h = document.createElement('div');
        h.className = 'tiptap-resize-handle tiptap-resize-' + pos;
        h.style.display = 'none';
        dom.appendChild(h);
        handleEls[pos] = h;

        h.addEventListener('mousedown', function(e) {
          e.preventDefault();
          e.stopPropagation();

          var startX = e.clientX;
          var startWidth = img.offsetWidth;
          var isLeft = pos === 'nw' || pos === 'sw';

          function onMouseMove(e) {
            var dx = e.clientX - startX;
            var newWidth = Math.max(50, isLeft ? startWidth - dx : startWidth + dx);
            img.style.width = newWidth + 'px';
          }

          function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            var pos2 = getPos();
            if (typeof pos2 === 'number') {
              editor.view.dispatch(
                editor.view.state.tr.setNodeMarkup(pos2, null, {
                  ...node.attrs,
                  width: img.offsetWidth,
                })
              );
            }
          }

          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
        });
      });

      function showHandles() {
        Object.values(handleEls).forEach(function(h) { h.style.display = 'block'; });
        dom.classList.add('tiptap-image-selected');
      }

      function hideHandles() {
        Object.values(handleEls).forEach(function(h) { h.style.display = 'none'; });
        dom.classList.remove('tiptap-image-selected');
      }

      dom.addEventListener('click', function(e) {
        e.stopPropagation();
        showHandles();
      });

      document.addEventListener('click', function(e) {
        if (!dom.contains(e.target)) hideHandles();
      });

      return {
        dom,
        update(updatedNode) {
          if (updatedNode.type !== node.type) return false;
          img.src = updatedNode.attrs.src;
          if (updatedNode.attrs.width) img.style.width = updatedNode.attrs.width + 'px';
          return true;
        },
        destroy() {
          hideHandles();
        },
      };
    };
  },
});

export const CollapsibleBlock = Node.create({
  name: 'collapsibleBlock',
  group: 'block',
  content: 'collapsibleSummary collapsibleContent',
  defining: true,

  addAttributes() {
    return {
      open: {
        default: true,
        parseHTML: element => element.hasAttribute('open'),
        renderHTML: attributes => attributes.open ? { open: '' } : {},
      },
    };
  },

  parseHTML() { return [{ tag: 'details' }]; },
  renderHTML({ HTMLAttributes }) {
    return ['details', mergeAttributes(HTMLAttributes), 0];
  },
});

export const CollapsibleSummary = Node.create({
  name: 'collapsibleSummary',
  content: 'inline*',
  defining: true,

  parseHTML() { return [{ tag: 'summary' }]; },
  renderHTML({ HTMLAttributes }) {
    return ['summary', mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ({ getPos, editor }) => {
      const dom = document.createElement('summary');
      dom.style.display = 'flex';
      dom.style.alignItems = 'center';
      dom.style.listStyle = 'none';
      dom.style.cursor = 'default';

      dom.addEventListener('click', (e) => { e.preventDefault(); });

      const arrow = document.createElement('span');
      arrow.className = 'tiptap-collapse-arrow';
      arrow.style.cursor = 'pointer';
      arrow.style.userSelect = 'none';
      arrow.style.marginRight = '6px';
      arrow.style.flexShrink = '0';

      function updateArrow() {
        const pos = getPos();
        if (typeof pos !== 'number') return;
        const rPos = editor.view.state.doc.resolve(pos);
        const parentPos = rPos.before(rPos.depth);
        const pNode = editor.view.state.doc.nodeAt(parentPos);
        arrow.textContent = (pNode && pNode.attrs.open) ? '▼' : '▶';
      }

      updateArrow();

      arrow.addEventListener('mousedown', (e) => {
        e.preventDefault();
        const pos = getPos();
        if (typeof pos !== 'number') return;
        const rPos = editor.view.state.doc.resolve(pos);
        const parentPos = rPos.before(rPos.depth);
        const pNode = editor.view.state.doc.nodeAt(parentPos);
        if (pNode && pNode.type.name === 'collapsibleBlock') {
          editor.view.dispatch(
            editor.view.state.tr.setNodeMarkup(parentPos, null, {
              ...pNode.attrs,
              open: !pNode.attrs.open,
            })
          );
        }
      });

      editor.on('transaction', updateArrow);

      const contentDOM = document.createElement('span');
      contentDOM.style.flex = '1';

      dom.appendChild(arrow);
      dom.appendChild(contentDOM);

      return { dom, contentDOM, ignoreMutation: () => true };
    };
  },
});

export const CollapsibleContent = Node.create({
  name: 'collapsibleContent',
  content: 'block+',
  defining: true,

  parseHTML() { return [{ tag: 'div[data-type="collapsible-content"]' }]; },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'collapsible-content' }), 0];
  },
});
