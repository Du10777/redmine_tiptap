[Русская версия](README.ru.md)

# Translations of the editor

The texts of the editor (tooltips of the toolbar, menus, dialogs, the code language list, the texts of blocks it inserts) are not in the JavaScript. They are in the files of this folder, one file per language.

The editor shows them in the language chosen in the user's Redmine profile (My account → Language). Someone who is not logged in gets the language Redmine picks for them: that of the browser if Redmine has it, otherwise the default language of Redmine. A language that has no file here is shown in English, and so is every text missing from a file.

| File | Language |
|---|---|
| `en.yml` | English. The source of all translations: every text is here. |
| `ru.yml` | Russian. |

## Adding a language

1. Find the code of the language in the [list of Redmine languages](#languages-of-redmine) below. Only these codes work: a file for any other code would never be used.
2. Copy `en.yml` to `<code>.yml`, for example `de.yml`.
3. Change the first line from `en:` to `<code>:` (`de:`). For Norwegian write `"no":` in quotes, because YAML reads a bare `no:` as the word "false".
4. Translate the values and keep the keys (the words before the colon) as they are. Keep double quotes around the texts. The first characters of the list items (`☑`, `•`, `1.`, `a.`) are part of the text and may stay. The texts are plain text, HTML in them is shown as it is.
5. Check the file, from the Redmine folder:
   ```sh
   bundle exec rake redmine_tiptap:locales RAILS_ENV=production
   ```
6. Restart Redmine.

You do not have to translate everything at once: a text that is left out, or left empty, is shown in English. Run the check with `LOCALE=de` to list what `de.yml` still lacks:

```sh
bundle exec rake redmine_tiptap:locales LOCALE=de RAILS_ENV=production
```

The check also tells about the keys that are not in `en.yml` (a typo, or a text that was removed), a file whose first line does not match its name, a code that is not a language of Redmine, and invalid YAML. It exits with an error if it finds any, so it can be run from a script.

When the plugin gets a new text, it is added to `en.yml` and `ru.yml`. Until a language file has it, the text is shown in English; the check lists it.

## Regional variants

A language with a region falls back to the language without it, and then to English:

| Code | Falls back to |
|---|---|
| `pt-BR` | `pt` |
| `zh-TW` | `zh` |
| `en-GB` | `en` |
| `es-PA` | `es` |
| `sr-YU` | `sr` |

So it is enough to translate `pt` once, and `pt-BR.yml` is only needed for texts that differ in Brazil. Note that `zh-TW` (Traditional Chinese) without a file of its own shows `zh` (Simplified Chinese), not English.

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

All three are optional. Searching always works with the English words as well. `ru.yml` has real examples. The `id` must be the name of a file in `highlight/` (the check tells about a wrong one).

## Languages of Redmine

These are the languages of Redmine 6.1.4. The code is the name of the file in Redmine's own `config/locales`.

| Code | Language |
|---|---|
| `sq` | Albanian (Shqip) |
| `ar` | Arabic (عربي) (right to left) |
| `az` | Azerbaijani (Azeri) |
| `eu` | Basque (Euskara) |
| `bs` | Bosnian (Bosanski) |
| `bg` | Bulgarian (Български) |
| `ca` | Catalan (Català) |
| `zh` | Chinese/Simplified (简体中文) |
| `zh-TW` | Chinese/Traditional (繁體中文) |
| `hr` | Croatian (Hrvatski) |
| `cs` | Czech (Čeština) |
| `da` | Danish (Dansk) |
| `nl` | Dutch (Nederlands) |
| `en` | English |
| `en-GB` | English (British) |
| `et` | Estonian (Eesti) |
| `fi` | Finnish (Suomi) |
| `fr` | French (Français) |
| `gl` | Galician (Galego) |
| `de` | German (Deutsch) |
| `el` | Greek (Ελληνικά) |
| `he` | Hebrew (עברית) (right to left) |
| `hu` | Hungarian (Magyar) |
| `id` | Indonesian (Bahasa Indonesia) |
| `it` | Italian (Italiano) |
| `ja` | Japanese (日本語) |
| `ko` | Korean (한국어) |
| `lv` | Latvian (Latviešu) |
| `lt` | Lithuanian (lietuvių) |
| `mk` | Macedonian (Македонски) |
| `mn` | Mongolian (Монгол) |
| `no` | Norwegian (Norsk bokmål) |
| `fa` | Persian (فارسی) (right to left) |
| `pl` | Polish (Polski) |
| `pt` | Portuguese (Português) |
| `pt-BR` | Portuguese/Brazil (Português/Brasil) |
| `ro` | Romanian (Română) |
| `ru` | Russian (Русский) |
| `sr-YU` | Serbian (Srpski) |
| `sr` | Serbian Cyrillic (Српски) |
| `sk` | Slovak (Slovenčina) |
| `sl` | Slovene (Slovenščina) |
| `es` | Spanish (Español) |
| `es-PA` | Spanish/Panama (Español/Panamá) |
| `sv` | Swedish (Svenska) |
| `ta-IN` | Tamil (தமிழ்) |
| `th` | Thai (ไทย) |
| `tr` | Turkish (Türkçe) |
| `uk` | Ukrainian (Українська) |
| `vi` | Vietnamese (Tiếng Việt) |

The editor has not been checked in the languages written right to left (Arabic, Hebrew, Persian).
