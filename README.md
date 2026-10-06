**Read this in other languages:**
[Русский](docs/README.ru.md) ·
[Shqip](docs/README.sq.md) ·
[Azeri](docs/README.az.md) ·
[Bosanski](docs/README.bs.md) ·
[Български](docs/README.bg.md) ·
[Català](docs/README.ca.md) ·
[简体中文](docs/README.zh.md) ·
[繁體中文](docs/README.zh-TW.md) ·
[Hrvatski](docs/README.hr.md) ·
[Čeština](docs/README.cs.md) ·
[Dansk](docs/README.da.md) ·
[Nederlands](docs/README.nl.md) ·
[Eesti](docs/README.et.md) ·
[Suomi](docs/README.fi.md) ·
[Français](docs/README.fr.md) ·
[Galego](docs/README.gl.md) ·
[Deutsch](docs/README.de.md) ·
[Ελληνικά](docs/README.el.md) ·
[Magyar](docs/README.hu.md) ·
[Bahasa Indonesia](docs/README.id.md) ·
[Italiano](docs/README.it.md) ·
[日本語](docs/README.ja.md) ·
[한국어](docs/README.ko.md) ·
[Latviešu](docs/README.lv.md) ·
[lietuvių](docs/README.lt.md) ·
[Монгол](docs/README.mn.md) ·
[Norsk bokmål](docs/README.no.md) ·
[Polski](docs/README.pl.md) ·
[Português](docs/README.pt.md) ·
[Português/Brasil](docs/README.pt-BR.md) ·
[Română](docs/README.ro.md) ·
[Srpski](docs/README.sr-YU.md) ·
[Српски](docs/README.sr.md) ·
[Slovenčina](docs/README.sk.md) ·
[Slovenščina](docs/README.sl.md) ·
[Español](docs/README.es.md) ·
[Svenska](docs/README.sv.md) ·
[ไทย](docs/README.th.md) ·
[Türkçe](docs/README.tr.md) ·
[Українська](docs/README.uk.md) ·
[Tiếng Việt](docs/README.vi.md)

This is text editor for Redmine, based on TipTap https://github.com/ueberdosis/tiptap

Supported Redmine versions: **6.\*** and **7.\*** (tested on 6.1.4, 6.1.5 and 7.0.2).

Editor engine: **TipTap 3.31.4**. All `@tiptap/*` packages are pinned to this exact version in `package.json` and `package-lock.json` and must always be upgraded together, to one and the same version.

## Features

**Text formatting**
- Bold, italic, underline, strikethrough, subscript and superscript (Ctrl+, and Ctrl+.), inline code.
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
- `<HTML>` mode to view and edit the HTML source: nested blocks are indented, a blank line separates the blocks that take several lines, the syntax is colored by the same rules as an HTML code block, and Enter keeps the indent of the line.
- Markdown-style typing: `#` for headings, `-` and `1.` for lists, `[ ]` for tasks, ```` ```python ```` for a code block (any language name or none), `**bold**`, `---` for a horizontal rule. Standard keyboard shortcuts: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z and others.
- The editor never grows taller than the window: the toolbar and the form buttons stay in view, and the text scrolls inside. The height follows the window size and page zoom.
- A resize grip in the bottom right corner sets the height by hand. The height is remembered; double-click returns to automatic height.

**Redmine integration**
- Works in all Redmine text fields with formatting: issue descriptions and notes, wiki pages, news, forum messages, documents, project descriptions, long text custom fields, including fields that appear on the page later.
- Text is stored as HTML. To use the editor, choose *TipTap HTML* as the text formatting in Redmine settings.
- The interface (tooltips, menus, dialogs) follows the language in the user's Redmine profile. 47 of the 50 languages of Redmine come with the plugin: English and Russian are complete, the other 45 are drafts made with an AI model that native speakers are welcome to correct. The three languages written right to left (Arabic, Hebrew, Persian) are deliberately not supported (see [Interface language](#interface-language)).
- Stays fast on large texts: editors in hidden forms are created only when the form is opened, and long code blocks are highlighted when they scroll into view.
- Texts written in CKEditor (the redmine_ckeditor plugin) are shown the way they were and open in the editor with their formatting: no conversion, see [Migrating from CKEditor](#migrating-from-ckeditor).
- Saved texts are shown without unsafe HTML: scripts, event handlers and `javascript:` links are removed when a page is displayed, only what the editor itself produces is kept. This covers texts that come through the REST API or the `<HTML>` mode as well.

## Syntax highlighting

Code blocks are highlighted in the editor and on saved pages alike. The language of a block is picked from the badge in its top right corner; the list has a search box and remembers recently and frequently used languages.

52 languages come with the plugin, among them HTML, 1C, Cisco IOS, MikroTik RouterOS, Windows cmd, docker compose, Linux service logs and journalctl output.

You can add your own languages. Each language is one file in the `highlight/` folder. Any of the 190+ highlight.js grammars, or a third-party one, is converted into such a file with one command:

```sh
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

Details: [highlight/README/en.md](highlight/README/en.md).

## Interface language

The editor speaks the language chosen in the user's Redmine profile (My account → Language). Files for 47 of the 50 languages of Redmine come with the plugin, in `config/locales/`. English is the source and Russian is the author's own; the other 45 are drafts made with the help of an AI model and not yet reviewed by native speakers, so expect an odd phrase here and there. A text missing from a file is shown in English.

To correct a translation, change its values in `config/locales/<code>.yml` (`de`, `fr`, `pt-BR`, ...) and restart Redmine. `bundle exec rake redmine_tiptap:locales` checks the files. Pull requests with corrections are welcome.

**The languages written right to left (Arabic, Hebrew, Persian) are deliberately not supported.** Supporting them takes many changes to the code base, not only a translation, and we chose not to take that on. For these languages the editor is shown in English and its layout is not adjusted. If you need one of them, make a fork: the translation mechanism is ready, and what else has to be changed is listed in [config/locales/README.md](config/locales/README.md#right-to-left-languages).

Details and the list of Redmine languages: [config/locales/README.md](config/locales/README.md).

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
- If *Cache formatted text* is enabled in Redmine settings (Administration → Settings → General), clear Redmine's cache once after updating to a version that changes how texts are shown (HTML cleaning, support of CKEditor texts): `bundle exec rake tmp:cache:clear RAILS_ENV=production` in the Redmine folder. Otherwise pages rendered before the update can be shown from the cache, uncleaned, until their text changes.
- Earlier versions of the plugin copied the script to `public/tiptap_bundle.js`. These files are no longer used and can be deleted:
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```

## Migrating from CKEditor

If your Redmine used [redmine_ckeditor](https://github.com/a-ono/redmine_ckeditor), you can switch to this plugin and keep every text that has been written: issues, notes, wiki pages, news, messages, documents. Nothing is converted and the database is not touched. CKEditor stores its texts as HTML and so does this plugin, so a stored text is simply shown by the new formatter.

1. Install the plugin (see above) and choose Text formatting: *TipTap HTML*.
2. Keep the folder `public/system/rich/` of your Redmine. If people inserted pictures and files with CKEditor's image browser, they are stored there, not in the database and not among the attachments, and the texts refer to them by address (`/system/rich/...`). **If Redmine is moved to another server or set up anew, move this folder too**, together with the database and the `files/` folder: neither of them holds these files, and without the folder the pictures in old texts give a 404 error. Attachments of issues, wiki pages and so on are stored as before and need nothing. Pictures inserted in this editor are ordinary attachments. The folder stays needed after redmine_ckeditor is removed.
3. Remove redmine_ckeditor when you no longer need it.

An old text is shown the way CKEditor showed it: fonts, sizes, colors and alignment, indents, lists, tables (borders, widths, captions, merged cells), pictures (size, float, border, a picture inside a link), links, code blocks with their language (highlighted), Redmine macros (`{{toc}}`, `{{collapse(Title) ... }}`, `{{thumbnail(...)}}` and so on), wiki and issue links, plain web addresses made clickable, and embedded `<iframe>` (video). A text written in CKEditor is recognized by its markup and keeps the spacing between paragraphs it had there, which is wider than in this editor.

Differences on purpose:
- An `<iframe>` is shown only when it points to another site over http(s), and it is sandboxed: the page inside can run its own scripts, but cannot reach the page of Redmine, open the top window or submit forms. All other `<iframe>` are removed.
- Links open in the same window: the `target` attribute of a link (CKEditor's "New Window (_blank)") is not kept.
- Some formatting that CKEditor offered but its pages silently dropped is shown here: for example the background colors of its "Marker" styles and the quotation marks of `<q>`.
- The "Special Container" style of CKEditor (a block with a gray frame) is shown as a code block without highlighting, and it is a code block in the editor too.

An old text keeps its formatting when it is opened in the editor and saved again: Redmine macros (a macro is one gray element in the editor; edit it in the `<HTML>` mode, as in CKEditor's Source mode), `<iframe>`, `<div>` and `<address>` blocks with their style (a `<div>` that is pasted from a web page is still turned into a paragraph), subscript and superscript, CKEditor's inline styles (big, small, keyboard, sample and so on), the style of headings, tables and table cells, the size (width and height), float, border and link of pictures, the language of code blocks. What does not survive editing: the caption of a table becomes a centered paragraph above it, the header and footer sections of a table become ordinary rows (the footer stays at the bottom), and `<del>` becomes `<s>` (the same look). A text saved from this editor gets the compact paragraph spacing of this editor.
