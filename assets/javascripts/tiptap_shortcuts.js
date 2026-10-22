import { Extension } from '@tiptap/core';
import { openLinkModal } from './tiptap_modals.js';
import { insertQuote } from './tiptap_quote.js';
import { insertCollapsible } from './tiptap_collapsible.js';

// Keyboard shortcuts for toolbar buttons that TipTap has none for; each does what
// its button does, and the tooltips name them (SHORTCUTS in tiptap_toolbar.js).
// Ctrl and a letter only: ProseMirror finds such a shortcut on any keyboard layout
// (by the letter, on a non-Latin layout by the key), while Ctrl+Alt is AltGr on
// Windows. The letters are free in the editor; what browsers do with them (a
// bookmark, the next match of a search, the downloads, the search field) does not
// matter while typing. K is the link in most editors, D a divider (the line),
// G is the key of "П" on a Russian keyboard ("прятать": the collapsible block).
export const ToolbarShortcuts = Extension.create({
  name: 'toolbarShortcuts',

  addKeyboardShortcuts() {
    var editor = this.editor;
    return {
      'Mod-k': function() { openLinkModal(editor); return true; },
      'Mod-j': function() { insertQuote(editor); return true; },
      'Mod-g': function() { insertCollapsible(editor); return true; },
      'Mod-d': function() { editor.chain().focus().setHorizontalRule().run(); return true; },
    };
  },
});
