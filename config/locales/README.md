[Русская версия](README.ru.md)

# Translations of the editor

The texts of the editor (tooltips of the toolbar, menus, dialogs, the code language list, the texts of blocks it inserts) are not in the JavaScript. They are in the files of this folder, one file per language.

The editor shows them in the language chosen in the user's Redmine profile (My account → Language). Someone who is not logged in gets the language Redmine picks for them: that of the browser if Redmine has it, otherwise the default language of Redmine. A text missing from a file is shown in English (a language with a region looks in the language without it first, see [Regional variants](#regional-variants)).

47 of the 50 languages of Redmine have a file here. The other three are written right to left and are deliberately not supported, see [Right-to-left languages](#right-to-left-languages).

| File | Language |
|---|---|
| `en.yml` | English. The source of all translations: every text is here. |
| `ru.yml` | Russian, by the author of the plugin. |
| the other 45 files | The other languages of Redmine, see the [table](#languages-of-redmine) below. |

**These 45 translations are drafts.** They were made with the help of an AI model and have not been reviewed by native speakers. They keep to the wording of Redmine's own interface in each language, but expect an odd phrase here and there. Corrections are welcome.

## Improving a translation

1. Open `<code>.yml` of the language and change the values. Keep the keys (the words before the colon) as they are, and keep double quotes around the texts. The first characters of the list items (`☑`, `•`, `1.`, `a.`) are part of the text and may stay. The texts are plain text, HTML in them is shown as it is.
2. Check the file, from the Redmine folder:
   ```sh
   bundle exec rake redmine_tiptap:locales RAILS_ENV=production
   ```
3. Restart Redmine to see the change.
4. Send the file as a pull request, or open an issue with what should be changed. When a native speaker has gone through a whole file, its "draft" note is removed from the header of the file and from the table below.

The check also tells about the keys that are not in `en.yml` (a typo, or a text that was removed), a file whose first line does not match its name, a code that is not a language of Redmine, and invalid YAML. It exits with an error if it finds any, so it can be run from a script. To see what a language still lacks, add `LOCALE=de`:

```sh
bundle exec rake redmine_tiptap:locales LOCALE=de RAILS_ENV=production
```

When the plugin gets a new text, it is added to `en.yml` and `ru.yml`. Until a language file has it, the text is shown in English; the check lists it.

## Adding a language

All languages of Redmine 6 and 7 have a file already, except the three written right to left (see [Right-to-left languages](#right-to-left-languages)). This section is for a language that a later Redmine brings, and for a fork that adds one of those three.

1. Find its code in the [list of Redmine languages](#languages-of-redmine) (only such codes work: a file for any other code would never be used).
2. Copy `en.yml` to `<code>.yml`, for example `de.yml`.
3. Change the first line from `en:` to `<code>:` (`de:`). For Norwegian write `"no":` in quotes, because YAML reads a bare `no:` as the word "false".
4. Translate the values as described above. You do not have to translate everything at once: a text that is left out, or left empty, is shown in English.

## Regional variants

A language with a region falls back to the language without it, and then to English, text by text:

| Code | Falls back to |
|---|---|
| `pt-BR` | `pt` |
| `zh-TW` | `zh` |
| `en-GB` | `en` |
| `es-PA` | `es` |
| `sr-YU` | `sr` |

`pt-BR.yml` (Brazilian Portuguese), `zh-TW.yml` (Traditional Chinese) and `sr-YU.yml` (Serbian in Latin script) are complete translations of their own. `en-GB.yml` and `es-PA.yml` hold only the few texts that differ from `en.yml` (British spelling: colour, centre) and `es.yml`; every other text comes from the language without the region, so a fix of a common text belongs in `en.yml` or `es.yml`. `ta-IN` (Tamil) has no language to fall back to: Redmine has no plain `ta`.

## Names of syntax highlighting languages

The names and notes of the code languages (Python, SQL, ...) come with the language files in the `highlight/` folder, in English. A translation file can change how a language looks in the list and on the badge of a code block, and add words the language can be found by in the search box, under `code_languages:` and the `id` of the language:

```yaml
de:
  redmine_tiptap:
    code_languages:
      routeros:
        label: "..."      # shown instead of the name in highlight/routeros.js
        hint: "..."       # shown instead of its grey note
        keywords: "..."   # extra search words, added to the English ones
```

All three are optional. Searching always works with the English words as well. `ru.yml` has real examples; the draft translations leave the names in English. The `id` must be the name of a file in `highlight/` (the check tells about a wrong one).

## Languages of Redmine

These are the languages of Redmine 6.1.4 and 7.0.2 (the list is the same). The code is the name of the file in Redmine's own `config/locales`. "Draft" is explained above.

| Code | Language | Translation |
|---|---|---|
| `sq` | Albanian (Shqip) | draft |
| `ar` | Arabic (عربي), right to left | not supported, see below |
| `az` | Azerbaijani (Azeri) | draft |
| `eu` | Basque (Euskara) | draft |
| `bs` | Bosnian (Bosanski) | draft |
| `bg` | Bulgarian (Български) | draft |
| `ca` | Catalan (Català) | draft |
| `zh` | Chinese/Simplified (简体中文) | draft |
| `zh-TW` | Chinese/Traditional (繁體中文) | draft |
| `hr` | Croatian (Hrvatski) | draft |
| `cs` | Czech (Čeština) | draft |
| `da` | Danish (Dansk) | draft |
| `nl` | Dutch (Nederlands) | draft |
| `en` | English | source |
| `en-GB` | English (British) | draft, only what differs from `en` |
| `et` | Estonian (Eesti) | draft |
| `fi` | Finnish (Suomi) | draft |
| `fr` | French (Français) | draft |
| `gl` | Galician (Galego) | draft |
| `de` | German (Deutsch) | draft |
| `el` | Greek (Ελληνικά) | draft |
| `he` | Hebrew (עברית), right to left | not supported, see below |
| `hu` | Hungarian (Magyar) | draft |
| `id` | Indonesian (Bahasa Indonesia) | draft |
| `it` | Italian (Italiano) | draft |
| `ja` | Japanese (日本語) | draft |
| `ko` | Korean (한국어) | draft |
| `lv` | Latvian (Latviešu) | draft |
| `lt` | Lithuanian (lietuvių) | draft |
| `mk` | Macedonian (Македонски) | draft |
| `mn` | Mongolian (Монгол) | draft |
| `no` | Norwegian (Norsk bokmål) | draft |
| `fa` | Persian (فارسی), right to left | not supported, see below |
| `pl` | Polish (Polski) | draft |
| `pt` | Portuguese (Português) | draft |
| `pt-BR` | Portuguese/Brazil (Português/Brasil) | draft |
| `ro` | Romanian (Română) | draft |
| `ru` | Russian (Русский) | by the author |
| `sr-YU` | Serbian (Srpski) | draft |
| `sr` | Serbian Cyrillic (Српски) | draft |
| `sk` | Slovak (Slovenčina) | draft |
| `sl` | Slovene (Slovenščina) | draft |
| `es` | Spanish (Español) | draft |
| `es-PA` | Spanish/Panama (Español/Panamá) | draft, only what differs from `es` |
| `sv` | Swedish (Svenska) | draft |
| `ta-IN` | Tamil (தமிழ்) | draft |
| `th` | Thai (ไทย) | draft |
| `tr` | Turkish (Türkçe) | draft |
| `uk` | Ukrainian (Українська) | draft |
| `vi` | Vietnamese (Tiếng Việt) | draft |

## Right-to-left languages

Arabic (`ar`), Hebrew (`he`) and Persian (`fa`) are written right to left. **The plugin does not support them, and this is a deliberate decision.** Supporting a language written right to left takes many changes to the code base, not only a translation file, and we chose not to take on that work and its upkeep. For a user whose Redmine language is one of the three there is no file here, so the editor is shown in English. Redmine mirrors the page, but the layout of the editor is not adjusted and not tested, and parts of it may look wrong.

If you need one of these languages, make a fork. The translation side is ready: copy `en.yml` to `ar.yml`, `he.yml` or `fa.yml` and translate it, as described in [Adding a language](#adding-a-language). The rest is the layout. When it was tried, these were the places that needed work:

- The styles of the editor name the left and the right side in about a dozen places: the border of a quote, the indent of lists, the corner of the language badge and the "Copy" button, the arrow of the font size box, the resize handle, the alignment of table headers. They have to be replaced with the start and the end of the line (CSS logical properties such as `padding-inline-start` and `inset-inline-end`).
- On a right-to-left page Redmine 6 pads every paragraph of a form at the right by the width of the label column. The plugin resets only the left padding, so the text of the editor is pushed 180px from the edge and every table becomes five times wider.
- The dropdown menus, the colour palette and the language list are placed by the left edge of their button. On a right-to-left page they have to be placed by the right edge, or they run off the page.
- Code is better drawn left to right whatever the direction of the page. Otherwise the bidirectional text algorithm of the browser reorders the parts of a line of code (a lone `}` is shown as `{`), and the language badge covers the first characters of a line.
- The indent buttons write `margin-left` into the saved text, so right-aligned text does not move. A fix has to change the saved format and the list of allowed styles in `lib/redmine/wiki_formatting/tiptap/sanitizer.rb`.
- The table library drags a column border the wrong way round on a right-to-left page.
