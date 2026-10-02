// Проверка языков подсветки перед сборкой, её запускает _compile.sh:
//   node highlight/_check.mjs /tmp/hl-check/*.mjs
//
// Каждый язык заранее собран в отдельный модуль. Здесь он загружается,
// регистрируется в lowlight — том же движке, что работает в браузере, — и
// раскрашивает пробный текст. Без проверки сломанная грамматика молча
// осталась бы без цвета, а ошибка при загрузке одного файла языка оставила
// бы без подсветки все языки сразу.
import { createLowlight } from 'lowlight';
import { basename } from 'node:path';
import { pathToFileURL } from 'node:url';

// id попадает в сохранённый HTML как class="language-<id>".
const ID_RE = /^[a-z0-9][a-z0-9_-]*$/;

// Текст, в котором есть за что зацепиться почти любой грамматике.
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

  // Если грамматика не регистрируется, highlight.js не бросает исключение,
  // а пишет в console.error и подставляет простой текст — ловим это.
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
