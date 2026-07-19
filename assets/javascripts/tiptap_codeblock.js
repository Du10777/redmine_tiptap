import CodeBlock from '@tiptap/extension-code-block';

// Блок кода с возможностью форматирования текста внутри:
// - marks перечислены явно БЕЗ inline-code, иначе внутренний <code> в
//   <pre><code> при обратном парсинге даёт вложенные <code>.
export const FormattableCodeBlock = CodeBlock.extend({
  marks: 'bold italic strike underline link textStyle',

  addCommands() {
    return {
      ...this.parent?.(),

      // Вытащить текст из блока кода в обычный параграф.
      // Есть выделение -> режем блок на: код(до) + параграф(выделенное) + код(после).
      // Нет выделения (курсор в блоке) -> весь блок превращается в параграф.
      liftFromCodeBlock: () => function(props) {
        var state = props.state;
        var dispatch = props.dispatch;
        var tr = props.tr;
        var sel = state.selection;
        var $from = sel.$from;

        var depth = $from.depth;
        while (depth > 0 && $from.node(depth).type.name !== 'codeBlock') depth--;
        if (depth < 1 || $from.node(depth).type.name !== 'codeBlock') return false;

        var cbNode = $from.node(depth);
        var before = $from.before(depth);
        var contentStart = before + 1;
        var content = cbNode.content;

        var fromOff, toOff;
        if (sel.empty) {
          fromOff = 0;
          toOff = content.size;
        } else {
          fromOff = sel.from - contentStart;
          toOff = sel.to - contentStart;
        }

        // Отрезаем разделительные \n, примыкающие к выделению, чтобы
        // соседние блоки кода не получили лишний ведущий/хвостовой перенос.
        var full = cbNode.textContent;
        var beforeEnd = fromOff;
        var afterStart = toOff;
        if (!sel.empty) {
          if (fromOff > 0 && full[fromOff - 1] === '\n') beforeEnd = fromOff - 1;
          if (toOff < full.length && full[toOff] === '\n') afterStart = toOff + 1;
        }

        var fragBefore = content.cut(0, beforeEnd);
        var fragMiddle = content.cut(fromOff, toOff);
        var fragAfter = content.cut(afterStart, content.size);

        var paraType = state.schema.nodes.paragraph;
        var nodes = [];
        if (fragBefore.size) nodes.push(cbNode.type.create(cbNode.attrs, fragBefore));
        nodes.push(paraType.create(null, fragMiddle));
        if (fragAfter.size) nodes.push(cbNode.type.create(cbNode.attrs, fragAfter));

        tr.replaceWith(before, before + cbNode.nodeSize, nodes);
        if (dispatch) dispatch(tr);
        return true;
      },
    };
  },
});
