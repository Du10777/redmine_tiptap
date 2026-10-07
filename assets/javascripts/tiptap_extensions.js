import { Node, mergeAttributes } from '@tiptap/core';
import BaseImage from '@tiptap/extension-image';
import { definingAsContext } from './tiptap_blocks.js';
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
export {
  RedmineMacro, Subscript, Superscript, InlineTagMarks, LegacyIframe, LegacyAttributes,
  LegacyBlock, LegacyContainer, LegacyPaste,
} from './tiptap_legacy.js';

// A size of a picture in pixels, or null. A size that is not in pixels (50%, auto) is
// not read: it stays in the style of the picture as it was (see leftoverStyle in
// tiptap_legacy.js).
function pictureSize(element, property) {
  var fromStyle = element.style[property];
  if (fromStyle) return /^\d+(?:\.\d+)?px$/.test(fromStyle) ? Math.round(parseFloat(fromStyle)) : null;
  var attribute = element.getAttribute(property) || '';
  return /^\d+$/.test(attribute) ? parseInt(attribute, 10) : null;
}

// The size of the picture in the editor: what the node says, nothing of its own where
// the node says nothing (the picture has its own proportions then).
function setSize(img, attrs) {
  img.style.width = attrs.width ? attrs.width + 'px' : '';
  img.style.height = attrs.height ? attrs.height + 'px' : '';
}

export const Image = BaseImage.extend({
  // A picture is part of a line of text, as in any HTML (and in CKEditor): text
  // around it stays in the same paragraph, and it can be a link (<a><img></a>).
  // As a block node it split the paragraph in two every time and could not be
  // wrapped in a link, so a text of CKEditor lost its layout when it was edited.
  addOptions() {
    return { ...this.parent?.(), inline: true };
  },

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
      // The size of a picture is kept as it was written, both the width and the
      // height (a picture may be given a size of other proportions than its own,
      // CKEditor's image dialog does it: style="height:50px; width:200px"). It is
      // read from the style (what this editor and CKEditor's dialog write) or from
      // the attribute of the same name (older texts), and written to the style.
      width: {
        default: null,
        parseHTML: element => pictureSize(element, 'width'),
        renderHTML: attributes => (attributes.width ? { style: 'width: ' + attributes.width + 'px' } : {}),
      },
      height: {
        default: null,
        parseHTML: element => pictureSize(element, 'height'),
        renderHTML: attributes => (attributes.height ? { style: 'height: ' + attributes.height + 'px' } : {}),
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

      // The node as it is now: the view is kept when the node changes (see update).
      var current = node;

      var img = document.createElement('img');
      img.src = node.attrs.src;
      img.alt = node.attrs.alt || '';
      setSize(img, node.attrs);
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
          var startHeight = img.offsetHeight;
          var isLeft = pos === 'nw' || pos === 'sw';
          // A picture that has a height of its own is scaled with it, its proportions
          // stay what they are; one that has only a width gets the height of its own
          // proportions from the browser.
          var scalesHeight = !!current.attrs.height && startWidth > 0;

          function onMouseMove(e) {
            var dx = e.clientX - startX;
            var newWidth = Math.max(50, isLeft ? startWidth - dx : startWidth + dx);
            img.style.width = newWidth + 'px';
            if (scalesHeight) img.style.height = Math.round(startHeight * newWidth / startWidth) + 'px';
          }

          function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            var pos2 = getPos();
            if (typeof pos2 === 'number') {
              editor.view.dispatch(
                editor.view.state.tr.setNodeMarkup(pos2, null, {
                  ...current.attrs,
                  width: img.offsetWidth,
                  height: scalesHeight ? img.offsetHeight : null,
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
          if (updatedNode.type !== current.type) return false;
          current = updatedNode;
          img.src = updatedNode.attrs.src;
          img.alt = updatedNode.attrs.alt || '';
          setSize(img, updatedNode.attrs);
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
  extendNodeSchema: definingAsContext('collapsibleBlock'),

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
  extendNodeSchema: definingAsContext('collapsibleSummary'),

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
  extendNodeSchema: definingAsContext('collapsibleContent'),

  parseHTML() { return [{ tag: 'div[data-type="collapsible-content"]' }]; },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'collapsible-content' }), 0];
  },
});
