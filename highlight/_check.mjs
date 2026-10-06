// Checks the highlight languages before the build; it is run by _compile.sh:
//   node highlight/_check.mjs <temporary dir>/*.mjs
//
// Each language has already been built into a separate module. Here it is loaded,
// registered in lowlight (the same engine that runs in the browser) and made to
// highlight a sample text. Without this check a broken grammar would silently
// stay uncolored, and an error while loading a single language file would leave
// all languages without highlighting at once.
import { createLowlight } from 'lowlight';
import { basename } from 'node:path';
import { pathToFileURL } from 'node:url';

// The id ends up in the saved HTML as class="language-<id>".
const ID_RE = /^[a-z0-9][a-z0-9_-]*$/;

// Text that gives almost any grammar something to match.
const SAMPLE = [
  '#!/bin/sh',
  'x = 1; y := "str" + \'c\' // comment',
  '/* block */ <tag attr="v">text</tag> {[(0x1F, 3.14e-2)]}',
  'if (a && b) { return f(a, b); } # note',
  '2026-10-02 03:00:01 ERROR [main] failed: 10.0.0.1:80',
].join('\n');

const problems = [];
const ids = new Map();

for (const file of process.argv.slice(2)) {
  const name = 'highlight/' + basename(file, '.mjs') + '.js';
  const report = (message) => problems.push(name + ': ' + message);

  let lang;
  try {
    lang = (await import(pathToFileURL(file).href)).default;
  } catch (error) {
    report('fails to load: ' + error.message);
    continue;
  }
  if (!lang || typeof lang !== 'object') {
    report('no "export default { id, grammar }"');
    continue;
  }
  if (typeof lang.id !== 'string' || !ID_RE.test(lang.id)) {
    report('bad id ' + JSON.stringify(lang.id) + ': allowed are a-z, 0-9, "-" and "_"');
    continue;
  }
  if (typeof lang.grammar !== 'function') {
    report('"grammar" is not a function');
    continue;
  }
  const notText = ['label', 'hint', 'keywords'].filter((key) => key in lang && typeof lang[key] !== 'string');
  if (notText.length) {
    report(notText.join(', ') + ' must be text');
    continue;
  }
  if (ids.has(lang.id)) {
    report('id "' + lang.id + '" is already used by ' + ids.get(lang.id));
    continue;
  }
  ids.set(lang.id, name);

  // If a grammar fails to register, highlight.js does not throw an exception
  // but writes to console.error and falls back to plain text, so catch that.
  const logged = [];
  const consoleError = console.error;
  console.error = (...args) => logged.push(args.map((a) => (a && a.message) || String(a)).join(' '));
  try {
    const lowlight = createLowlight();
    lowlight.register(lang.id, lang.grammar);
    lowlight.highlight(lang.id, SAMPLE);
  } catch (error) {
    logged.push(error.cause ? error.cause.message || String(error.cause) : error.message);
  } finally {
    console.error = consoleError;
  }
  if (logged.length) report(logged.join('; '));
}

if (problems.length) {
  console.error('Broken highlighting languages, the build is stopped:');
  problems.forEach((problem) => console.error('  ' + problem));
  process.exit(1);
}
