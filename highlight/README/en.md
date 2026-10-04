# Syntax highlighting: languages

**Read this in other languages:**
[English](en.md) ·
[Русский](ru.md) ·
[Shqip](sq.md) ·
[Azeri](az.md) ·
[Bosanski](bs.md) ·
[Български](bg.md) ·
[Català](ca.md) ·
[简体中文](zh.md) ·
[繁體中文](zh-TW.md) ·
[Hrvatski](hr.md) ·
[Čeština](cs.md) ·
[Dansk](da.md) ·
[Nederlands](nl.md) ·
[Eesti](et.md) ·
[Suomi](fi.md) ·
[Français](fr.md) ·
[Galego](gl.md) ·
[Deutsch](de.md) ·
[Ελληνικά](el.md) ·
[Magyar](hu.md) ·
[Bahasa Indonesia](id.md) ·
[Italiano](it.md) ·
[日本語](ja.md) ·
[한국어](ko.md) ·
[Latviešu](lv.md) ·
[lietuvių](lt.md) ·
[Монгол](mn.md) ·
[Norsk bokmål](no.md) ·
[Polski](pl.md) ·
[Português](pt.md) ·
[Português/Brasil](pt-BR.md) ·
[Română](ro.md) ·
[Srpski](sr-YU.md) ·
[Српски](sr.md) ·
[Slovenčina](sk.md) ·
[Slovenščina](sl.md) ·
[Español](es.md) ·
[Svenska](sv.md) ·
[ไทย](th.md) ·
[Türkçe](tr.md) ·
[Українська](uk.md) ·
[Tiếng Việt](vi.md)

Code blocks are highlighted both in the editor and on saved pages (issues, notes, wiki), and they look the same in both. The language of a block is chosen from the badge in its top right corner. The list of languages is defined by the files in the `highlight/` folder: one file is one language.

The plugin ships with 52 languages. You can add more: convert a ready-made highlight.js grammar with a script (see [Adding a language from highlight.js](#adding-a-language-from-highlightjs)) or write your own.

## How it works

- Highlighting is done by [highlight.js](https://highlightjs.org) (through [lowlight](https://github.com/wooorm/lowlight)). The editor and the saved pages use the same engine, so the colors match.
- `_compile.sh` bundles all language files into one file, `assets/javascripts/tiptap_highlight.js`. This file is committed to the repository already built, so installing the plugin needs no build. You only need to build it when you change the set of languages.
- Redmine loads `tiptap_highlight.js` on every page, before the editor (`tiptap_bundle.js`). On load the editor registers all languages from that file.
- In the editor a block is re-highlighted 50 ms after you pause typing, and only the block that changed. On saved pages a block is highlighted when it scrolls into view. A block inside a collapsed section is highlighted when the section is opened.
- The language is stored in the saved HTML: `<pre><code class="language-<id>">`. That is why the `id` of a language must never change: blocks saved with the old `id` would turn into plain text.
- There is no language auto-detection: a block without a language is shown as plain text. So is a block whose language is not in `highlight/` (for example, the language file was deleted); its badge keeps showing the `id`. If the language file comes back, so do the colors.
- Colors. highlight.js marks text with classes such as `hljs-keyword`, `hljs-string`, `hljs-comment`. Their colors are set in `assets/stylesheets/src/06_code.css`, using the palette of Redmine's own syntax highlighting.

## Language file

For example, `routeros.js`:

```js
import grammar from 'highlight.js/lib/languages/routeros';

export default {
  id: 'routeros',
  label: 'RouterOS',
  hint: 'MikroTik',
  keywords: 'mikrotik',
  grammar: grammar,
};
```

| Field | Required | What it is |
|---|---|---|
| `id` | yes | Language name in the saved HTML (`class="language-<id>"`). Allowed characters: `a-z`, `0-9`, `-`, `_`. **Never change it** once blocks with this language have been saved. |
| `label` | no | Name in the language list and on the block badge. Defaults to `id`. |
| `hint` | no | Grey note next to the name in the list. |
| `keywords` | no | Extra words for the list search, space-separated. |
| `grammar` | yes | A highlight.js grammar: a function `(hljs) => language definition`. |

`label`, `hint` and `keywords` are in English. To show a language under another name in the interface language of a user, or to make it findable by words of that language, add an entry to the translation file of that language, `config/locales/<code>.yml`, under `code_languages:`. The words there are added to `keywords`; `label` and `hint` replace the ones from the language file. `config/locales/ru.yml` has examples, the rules are in [config/locales/README.md](../../config/locales/README.md).

Kinds of files in the folder:

- **Short.** A reference to a grammar from the highlight.js npm package, as in the example above; most languages are like this. The grammar comes from the highlight.js version recorded in the plugin's `package-lock.json`.
- **Full copy.** The grammar code is in the file itself and can be edited. These files are created by the conversion script (see below).
- **Own grammar.** `log.js`, `journalctl.js`, `cisco-ios.js`; their shared parts are in `_common.js`.
- **Wrapper.** A ready grammar under another name: `cmd.js` is `dos` from highlight.js, `docker-compose.js` is `yaml`.

Files and folders whose names start with `_` are not languages:

- `_compile.sh` builds the languages;
- `_check.mjs` checks the languages during the build;
- `_common.js` holds shared parts of the plugin's own grammars;
- `_convert_grammar.py` is the script that converts highlight.js grammars (see below);
- `_vendor/` holds files imported by converted grammars (created by the conversion script).

The `README/` folder holds this documentation.

## Adding a language from highlight.js

Ready grammars (more than 190) are here: https://github.com/highlightjs/highlight.js/tree/main/src/languages. Their names and aliases are listed in [SUPPORTED_LANGUAGES.md](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md), together with about a hundred third-party grammars kept in separate repositories. The script `_convert_grammar.py` in this folder converts any of them into the plugin's format.

The script needs Python 3.6+ (no extra packages) and access to github.com. Run it from the plugin folder:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
python3 highlight/_convert_grammar.py erlang
sh highlight/_compile.sh
```

The argument `erlang` is the file name in `src/languages` without `.js`. The second command builds the languages and checks them. Then restart Redmine (see [Building and applying](#building-and-applying)). On Windows use `py` or `python` instead of `python3`.

Examples:

```sh
# list of highlight.js languages (* = already in highlight/), optionally filtered by a word
python3 highlight/_convert_grammar.py --list
python3 highlight/_convert_grammar.py --list sql

# several languages at once
python3 highlight/_convert_grammar.py erlang nix fsharp

# own name, hint and search words (one language at a time)
python3 highlight/_convert_grammar.py erlang --label "Erlang/OTP" --hint BEAM --keywords "erl otp"

# replace a short file shipped with the plugin with an editable full copy
python3 highlight/_convert_grammar.py routeros --force --label RouterOS --hint MikroTik --keywords mikrotik

# a language not yet in a released highlight.js version, from the development branch
python3 highlight/_convert_grammar.py odin --ref main

# a link to a grammar file, right from the browser address bar
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlight.js/blob/main/src/languages/odin.js

# a third-party grammar: a link to its repository, the script finds the grammar file
python3 highlight/_convert_grammar.py https://github.com/highlightjs/highlightjs-terraform

# a local grammar file
python3 highlight/_convert_grammar.py ~/grammars/mylang.js --id mylang

# a short file referencing the npm package instead of a copy of the code
python3 highlight/_convert_grammar.py erlang --npm

# show what would be done without changing anything
python3 highlight/_convert_grammar.py erlang --dry-run
```

### What the script does

1. Downloads `src/languages/<name>.js` of the highlight.js version the plugin runs on. The version is read from `package-lock.json` (currently 11.12.0), because grammars are written for the engine of their own version. `--ref` selects another version, branch or commit.
2. Takes the language name from the `Language:` line of the grammar header and the search words from its aliases (`aliases`). The `id` is the grammar file name.
3. Puts the grammar code into `highlight/<id>.js` unchanged except for the export: `export default function(hljs)` becomes `function grammar(hljs)`, and the language object `export default { id, label, keywords, grammar }` is appended at the end of the file. If the grammar is a CommonJS module (`module.exports = ...`), a line declaring `module` and `exports` is added at the top.
4. If the grammar imports other files, downloads them into `highlight/_vendor/<source>-<version>/` under the same paths as in the repository and points the imports there. For example, `typescript` imports `javascript.js` and `lib/ecmascript.js`. These files are shared by all languages from the same source and version; there is no need to edit them.
5. Checks the `Requires:` line, which lists the languages used for embedded code (for example, `php-template` needs `xml` and `php`). If they are not in `highlight/`, prints the command that adds them. Without them the embedded code simply stays uncolored; this is not an error.
6. Does not overwrite existing files without `--force` and does not take an `id` already used by another file.

After conversion the language can be edited right in its file.

### Options

| Option | What it does |
|---|---|
| `LANGUAGE ...` | A highlight.js language name, a link to a grammar file or to a third-party grammar repository on GitHub, or a path to a local `.js` file. |
| `--ref REF` | highlight.js version (tag), branch or commit. Defaults to the version in `package-lock.json`. For links the version is taken from the link. |
| `--id ID` | Language `id`. Defaults to the grammar file name. |
| `--label TEXT` | Name in the list and on the badge. Defaults to `Language:` from the grammar. |
| `--hint TEXT` | Grey note in the list. |
| `--keywords TEXT` | Space-separated search words. Default: the grammar aliases. |
| `--npm` | Instead of a copy of the code, write a short file referencing the highlight.js npm package. Only for languages of highlight.js itself. |
| `--force` | Replace existing files. |
| `--dry-run` | Show what would be done without changing anything. |
| `--list [WORD]` | List highlight.js languages and third-party grammars, optionally filtered by a word. |
| `--prune` | Delete files in `_vendor/` that no language imports any more. |


**Copy or `--npm`?** A copy shows the rules right in the file: you can edit them, take a grammar newer than the installed package, or a third-party one. A copy does not change when the plugin upgrades highlight.js; to refresh it, convert the language again with `--force`. A file made with `--npm` is a few lines long, and its grammar is upgraded together with the plugin.

## Building and applying

```sh
sh highlight/_compile.sh
```

- It needs Docker (the build runs in a `node:20-alpine` container) or, if there is no Docker, Node.js 18+ on the same machine. On the first run the script installs npm packages into the plugin's `node_modules/` folder.
- First the script checks every language: builds it separately, loads it, registers it in the same engine that runs in the browser, and highlights a sample text. If a language is broken (an error in the code, an invalid regular expression, an `id` already taken), the script names the file and the reason and stops; the previous `tiptap_highlight.js` stays in place.
- Then the script bundles all languages into `assets/javascripts/tiptap_highlight.js`.

After the build, restart Redmine: it publishes plugin files at startup (see "Updating" in the [main README](../../README.md#updating) for the commands). Browsers get the new file right away, because its URL contains a fingerprint of the content.

If the Redmine server has neither Docker nor Node.js, build on any machine that has one of them (a copy of the plugin folder is enough) and put the resulting `assets/javascripts/tiptap_highlight.js` on the server.

## Removing a language

Delete the language file from `highlight/`, build, and restart Redmine. Saved blocks in this language stay as they are and are shown as plain text. Files in `_vendor/` that are no longer needed are removed with:

```sh
python3 highlight/_convert_grammar.py --prune
```

## Own grammars and editing rules

- A grammar is a function that receives the `hljs` object and returns a language definition: which pieces of text to mark and how. Guide: https://highlightjs.readthedocs.io/en/latest/language-guide.html, reference: https://highlightjs.readthedocs.io/en/latest/mode-reference.html. Examples: `log.js`, `journalctl.js`, `cisco-ios.js`.
- highlight.js joins the regular expressions of all rules of a language into one and ignores their own flags. So case-insensitive matching has to be spelled out (`[Ee]rror`) or enabled for the whole language with `case_insensitive: true`.
- Prefer the standard token classes (`keyword`, `string`, `number`, `comment`, `title`, `attr`, `variable`, `built_in`, `literal`, `meta`, `symbol`, `type` and so on): they already have colors. A class of your own (for example, `scope: 'log-error'` produces the class `hljs-log-error`) needs a rule in `assets/stylesheets/src/06_code.css` and a CSS rebuild (`assets/stylesheets/src/_build.sh`).
- To offer a ready grammar under another name, do as `cmd.js` does: call the original grammar and change `name` and `aliases` in its result. If the aliases are not replaced, the new language takes them over from the original.

## Updating the plugin when you have added languages

git leaves your files in `highlight/` alone. But `assets/javascripts/tiptap_highlight.js` in the new plugin version is built without your languages, and your build of this file gets in the way of `git pull`. So:

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git checkout -- assets/javascripts/tiptap_highlight.js
git pull
sh highlight/_compile.sh
```

The first command discards your build, the last one builds the languages again, including yours. Then restart Redmine. If you have edited language files shipped with the plugin, git may ask you to resolve conflicts in them.

If the plugin was installed from an archive, save your language files and the `_vendor/` folder before replacing the plugin folder, put them back afterwards, and build the languages.

## Size

All languages are bundled into one file; the browser downloads it once and then takes it from the cache. Currently it is 226 KB for 52 languages. Most languages take 1–10 KB, the largest one is 1C (55 KB).
