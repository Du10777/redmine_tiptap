# Syntax highlighting languages

Each `*.js` file in this folder is one language of the code block language picker. Files whose names start with `_` are shared helpers, not languages.

The folder is compiled into `assets/javascripts/tiptap_highlight.js`, which the plugin loads right before the editor:

```sh
sh highlight/_compile.sh
```

The main `_build.sh` runs it as well. Restart Redmine afterwards: it publishes plugin assets at startup.

## File format

A language file exports a default object:

```js
import grammar from 'highlight.js/lib/languages/python';

export default {
  id: 'python',        // stored in saved HTML as class="language-python"; never rename it
  label: 'Python',     // optional: shown in the picker and on the badge (default: id)
  hint: '...',         // optional: grey note next to the label in the picker
  keywords: 'py ...',  // optional: extra search words, in any language
  grammar: grammar,    // a highlight.js grammar: function (hljs) => language definition
};
```

- A built-in highlight.js grammar is imported as above. All of them are in `node_modules/highlight.js/lib/languages`.
- A custom grammar is a function that returns a highlight.js language definition; see `log.js`, `journalctl.js` and `cisco-ios.js`. Language definition guide: https://highlightjs.readthedocs.io/en/latest/language-guide.html
- Token colors live in `assets/stylesheets/src/06_code.css`.

## Adding and removing languages

- To add a language, put its file here and run `_compile.sh`.
- To remove a language from the picker, delete its file and run `_compile.sh`. Code blocks that already use it are kept and shown as plain text.
- Do not rename the `id` of an existing language: saved code blocks refer to it.
