[Русская версия](README.ru.md)

# Translations of the editor

The texts of the editor (tooltips of the toolbar, menus, dialogs, the code language list, the texts of blocks it inserts) are not in the JavaScript. They are in the files of this folder, one file per language.

The editor shows them in the language chosen in the user's Redmine profile (My account → Language). Someone who is not logged in gets the language Redmine picks for them: that of the browser if Redmine has it, otherwise the default language of Redmine. A text missing from a file is shown in English (a language with a region looks in the language without it first, see [Regional variants](#regional-variants)).

Every one of the 50 languages of Redmine has a file here:

| File | Language |
|---|---|
| `en.yml` | English. The source of all translations: every text is here. |
| `ru.yml` | Russian, by the author of the plugin. |
| the other 48 files | The other languages of Redmine, see the [table](#languages-of-redmine) below. |

**These 48 translations are drafts.** They were made with the help of an AI model and have not been reviewed by native speakers. They keep to the wording of Redmine's own interface in each language, but expect an odd phrase here and there. Corrections are welcome.

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

All languages of Redmine 6.1.4 have a file already. This is for a language that a later Redmine brings.

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

These are the languages of Redmine 6.1.4. The code is the name of the file in Redmine's own `config/locales`. "Draft" is explained above.

| Code | Language | Translation |
|---|---|---|
| `sq` | Albanian (Shqip) | draft |
| `ar` | Arabic (عربي), right to left | draft |
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
| `he` | Hebrew (עברית), right to left | draft |
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
| `fa` | Persian (فارسی), right to left | draft |
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

Arabic, Hebrew and Persian are written right to left. Redmine mirrors the page for them, and the editor follows it: the toolbar and the texts are laid out right to left. One flaw is known: a code block follows the direction of the page too, so the language badge in its top right corner can cover the first characters of the first line of code.
