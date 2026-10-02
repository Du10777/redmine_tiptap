[Русская версия](README.ru.md)

This is text editor for Redmine, based on TipTap https://github.com/ueberdosis/tiptap

Supported Redmine versions: **6.\*** (developed and tested on 6.1.4).

Editor engine: **TipTap 3.31.4**. All `@tiptap/*` packages are pinned to this exact version in `package.json` and `package-lock.json` and must always be upgraded together, to one and the same version.

## Features

**Text formatting**
- Bold, italic, underline, strikethrough, inline code.
- Text color and background color: a 64-color palette or any hex value.
- Font family (13 fonts) and font size (presets from 8 to 72 px, or any value).
- Paragraph styles: headings 1–6 and normal text.
- Alignment (left, center, right, justify) and indentation (up to 8 levels) of paragraphs and headings.
- Links: insert, edit, remove.
- Horizontal rule, undo and redo.

**Lists**
- Bulleted lists with disc, circle or square markers.
- Numbered lists: 1, 01, a, A, i, I, α.
- Task lists with checkboxes; completed tasks are struck through.
- Nested lists (Tab / Shift+Tab).

**Tables**
- Insert a table of any size, with or without a header row.
- Right-click menu in a cell: add and delete rows and columns, merge and split cells, header row and header column, delete the table.
- Column widths are changed by dragging cell borders.
- Pasting from Excel keeps column widths, alignment and font sizes; a table copied from Redmine pastes into Excel with borders.

**Images and attachments**
- Paste an image from the clipboard: it is uploaded as an attachment and appears in the text.
- Images attached with Redmine's file field, or dropped onto it, are inserted into the text as well.
- Insert an image from the attachments (a thumbnail picker) or a link to any attachment.
- Resize an image by dragging its corners.

**Code**
- Code blocks with syntax highlighting in the editor and on saved pages: 52 languages, and you can add more (see [Syntax highlighting](#syntax-highlighting)).
- The language of a block is chosen from a badge in its corner, with search, recent and frequent languages.
- Tab and Shift+Tab indent and outdent lines inside a code block; bold, links and colors inside code are kept.

**Blocks**
- Collapsible block: a title with hidden content (`<details>`). Collapsed on saved pages, expanded in the editor.
- Quote block with an author and date line.

**Editing**
- `<HTML>` mode to view and edit the HTML source.
- Markdown-style typing: `#` for headings, `-` and `1.` for lists, `[ ]` for tasks, ```` ```python ```` for a code block (any language name or none), `**bold**`, `---` for a horizontal rule. Standard keyboard shortcuts: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z and others.
- The editor never grows taller than the window: the toolbar and the form buttons stay in view, and the text scrolls inside. The height follows the window size and page zoom.
- A resize grip in the bottom right corner sets the height by hand. The height is remembered; double-click returns to automatic height.

**Redmine integration**
- Works in all Redmine text fields with formatting: issue descriptions and notes, wiki pages, news, forum messages, documents, project descriptions, long text custom fields, including fields that appear on the page later.
- Text is stored as HTML. To use the editor, choose *TipTap HTML* as the text formatting in Redmine settings.
- Stays fast on large texts: editors in hidden forms are created only when the form is opened, and long code blocks are highlighted when they scroll into view.
- Saved texts are shown without unsafe HTML: scripts, event handlers and `javascript:` links are removed when a page is displayed, only what the editor itself produces is kept. This covers texts that come through the REST API or the `<HTML>` mode as well.

## Syntax highlighting

Code blocks are highlighted in the editor and on saved pages alike. The language of a block is picked from the badge in its top right corner; the list has a search box and remembers recently and frequently used languages.

52 languages come with the plugin, among them 1C, Cisco IOS, MikroTik RouterOS, Windows cmd, docker compose, Linux service logs and journalctl output.

You can add your own languages. Each language is one file in the `highlight/` folder. Any of the 190+ highlight.js grammars, or a third-party one, is converted into such a file with one command:

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Details: [highlight/README/en.md](highlight/README/en.md) (на русском: [highlight/README/ru.md](highlight/README/ru.md)).

## Installation

1. Put the plugin into Redmine's `plugins` folder. The folder must be named `redmine_tiptap`. The easiest way is git, which also makes updates a single command:
   ```sh
   cd /path/to/redmine
   git clone https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
2. Restart Redmine.
3. In Redmine settings (redmine.selfhosted/_settings_) choose Text formatting: *TipTap HTML*.

## Updating

The plugin has no database migrations, and the built JavaScript bundle and stylesheet are part of the repository. Updating needs neither npm nor a build on the server: replace the plugin files and restart Redmine.

Before updating, check that the new version supports your Redmine version (see "Supported Redmine versions" above).

### Installed with git (recommended)

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

Then restart Redmine, for example:

```sh
sudo systemctl restart redmine          # Redmine running as a systemd service
touch /path/to/redmine/tmp/restart.txt  # Passenger
docker compose restart redmine          # Docker
```

To stay on a particular version instead of the latest commit: `git fetch && git checkout <tag-or-commit>`.

### Installed from an archive

1. Delete the old `plugins/redmine_tiptap` folder and unpack the new version in its place. Deleting first makes sure that files removed in the new version do not linger.
2. Delete `public/assets/.manifest.json` in the Redmine folder.
3. Restart Redmine.

Step 2 matters. At startup Redmine republishes plugin assets only if their files are newer than this manifest. Files unpacked from an archive keep their original timestamps, so without step 2 Redmine may keep serving the old editor. The manifest is recreated automatically at startup. With `git pull` this step is not needed: git gives changed files the current time.

### After updating

- The editor's script and stylesheet are served with a content fingerprint in their URLs, so browsers load the new version right after the restart. Users do not need to clear their browser cache.
- If *Cache formatted text* is enabled in Redmine settings (Administration → Settings → General), clear Redmine's cache once after updating to a version with HTML cleaning: `bundle exec rake tmp:cache:clear RAILS_ENV=production` in the Redmine folder. Otherwise pages rendered before the update can be shown from the cache, uncleaned, until their text changes.
- Earlier versions of the plugin copied the script to `public/tiptap_bundle.js`. These files are no longer used and can be deleted:
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```
