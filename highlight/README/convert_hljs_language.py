#!/usr/bin/env python3
"""
Переносит грамматики подсветки синтаксиса из highlight.js в папку highlight/
плагина redmine_tiptap — в формат языка плагина.

Converts highlight.js syntax grammars into language files of the
redmine_tiptap plugin (the highlight/ folder).

    python3 highlight/README/convert_hljs_language.py routeros
    python3 highlight/README/convert_hljs_language.py --list

Подробно — README/ru.md рядом с этим файлом. Details: README/en.md next to it.
Нужен только Python 3.6+, без сторонних пакетов. Needs plain Python 3.6+.
"""

import argparse
import json
import os
import posixpath
import re
import sys
import urllib.error
import urllib.parse
import urllib.request

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
HIGHLIGHT_DIR = os.path.dirname(SCRIPT_DIR)
PLUGIN_DIR = os.path.dirname(HIGHLIGHT_DIR)
VENDOR_DIR = os.path.join(HIGHLIGHT_DIR, '_hljs')
SCRIPT = 'highlight/README/convert_hljs_language.py'

HLJS = ('highlightjs', 'highlight.js')
HLJS_LICENSE = 'https://github.com/highlightjs/highlight.js/blob/main/LICENSE'
RAW_URL = 'https://raw.githubusercontent.com/{0}/{1}/{2}/{3}'
BLOB_URL = 'https://github.com/{0}/{1}/blob/{2}/{3}'
API_URL = 'https://api.github.com/repos/{0}/{1}'

# id языка попадает в сохранённый HTML как class="language-<id>". Плагин
# узнаёт язык по классу через [\w+#-]; здесь правило строже — как у имён
# файлов языков в highlight.js.
ID_RE = re.compile(r'^[a-z0-9][a-z0-9_-]*$')


def _russian():
    """Говорить ли по-русски: по локали, как это делают консольные программы."""
    for var in ('LC_ALL', 'LC_MESSAGES', 'LANG'):
        value = os.environ.get(var)
        if value:
            return value.lower().startswith('ru')
    if os.name == 'nt':
        try:
            import ctypes
            return ctypes.windll.kernel32.GetUserDefaultUILanguage() & 0x3FF == 0x19
        except Exception:
            return False
    return False


RU = _russian()


def T(en, ru):
    return ru if RU else en


class Failure(Exception):
    """Ошибка, о которой достаточно сообщить одной строкой, без трассировки."""


# --- Загрузка ----------------------------------------------------------------

def fetch(url):
    """Текст по URL; None, если такого файла нет (404)."""
    request = urllib.request.Request(url, headers={'User-Agent': 'redmine_tiptap ' + SCRIPT})
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            return response.read().decode('utf-8-sig')
    except urllib.error.HTTPError as error:
        if error.code == 404:
            return None
        if error.code in (403, 429) and 'api.github.com' in url:
            raise Failure(T(
                'GitHub API refused the request (without a token it allows 60 requests per hour). '
                'Try again later or give the script a direct link to the grammar file.',
                'GitHub API отказал в запросе (без токена — 60 запросов в час). '
                'Повторите позже или дайте скрипту прямую ссылку на файл грамматики.'))
        raise Failure(T('cannot download {0}: HTTP {1}', 'не удалось скачать {0}: HTTP {1}').format(url, error.code))
    except (urllib.error.URLError, OSError) as error:
        reason = getattr(error, 'reason', error)
        raise Failure(T('cannot download {0}: {1}', 'не удалось скачать {0}: {1}').format(url, reason))


def fetch_json(url):
    text = fetch(url)
    return None if text is None else json.loads(text)


class GitHubSource(object):
    """Файлы из репозитория на GitHub. Зависимости грамматики раскладываются
    в _hljs/<репозиторий>-<версия>/ по тем же путям, что в репозитории."""

    def __init__(self, owner, repo, ref):
        self.owner, self.repo, self.ref = owner, repo, ref

    def is_hljs(self):
        return (self.owner, self.repo) == HLJS

    def read(self, path):
        return fetch(RAW_URL.format(self.owner, self.repo, self.ref, path))

    def join(self, base, spec):
        path = posixpath.normpath(posixpath.join(posixpath.dirname(base), spec))
        return None if path == '..' or path.startswith('../') else path

    def link(self, path):
        return BLOB_URL.format(self.owner, self.repo, self.ref, path)

    def vendor_dir(self, lang_id):
        name = self.repo if self.owner == HLJS[0] else self.owner + '-' + self.repo
        return name + '-' + re.sub(r'[^\w.-]+', '_', self.ref)

    def vendor_paths(self, main, locations):
        return dict((location, location) for location in locations)


class UrlSource(object):
    """Файл по произвольному URL. Зависимости — в _hljs/<id языка>/."""

    def read(self, url):
        return fetch(url)

    def join(self, base, spec):
        return urllib.parse.urljoin(base, spec)

    def link(self, url):
        return url

    def vendor_dir(self, lang_id):
        return lang_id

    def vendor_paths(self, main, locations):
        paths = dict((u, urllib.parse.urlsplit(u).path) for u in [main] + list(locations))
        root = posixpath.commonpath([posixpath.dirname(p) for p in paths.values()])
        return dict((u, posixpath.relpath(paths[u], root)) for u in locations)


class FileSource(object):
    """Локальный файл. Зависимости — в _hljs/<id языка>/."""

    def read(self, path):
        if not os.path.isfile(path):
            return None
        with open(path, encoding='utf-8-sig') as handle:
            return handle.read()

    def join(self, base, spec):
        return os.path.normpath(os.path.join(os.path.dirname(base), spec))

    def link(self, path):
        return os.path.basename(path)

    def vendor_dir(self, lang_id):
        return lang_id

    def vendor_paths(self, main, locations):
        root = os.path.commonpath([os.path.dirname(p) for p in [main] + list(locations)])
        return dict((p, os.path.relpath(p, root).replace(os.sep, '/')) for p in locations)


# --- Где лежит грамматика ----------------------------------------------------

GITHUB_RE = re.compile(r'^https?://(?:www\.)?github\.com/([^/]+)/([^/#?]+)'
                       r'(?:/(blob|tree|raw)/([^/#?]+)(?:/([^#?]*))?)?/?(?:[#?].*)?$')
RAW_GITHUB_RE = re.compile(r'^https?://raw\.githubusercontent\.com/([^/]+)/([^/]+)/'
                           r'(?:refs/(?:heads|tags)/)?([^/]+)/([^#?]+)')

# Файлы в репозитории сторонней грамматики, которые точно не грамматика.
NOT_GRAMMAR_DIRS = {'test', 'tests', 'spec', 'specs', 'dist', 'build', 'docs', 'demo',
                    'example', 'examples', 'node_modules', '.github', 'tools', 'scripts'}


class Origin(object):
    def __init__(self, source, location, name):
        self.source, self.location, self.name = source, location, name


def default_branch(owner, repo):
    info = fetch_json(API_URL.format(owner, repo))
    if info is None:
        raise Failure(T('GitHub repository {0}/{1} not found', 'на GitHub нет репозитория {0}/{1}').format(owner, repo))
    return info['default_branch']


def find_grammar_file(owner, repo, ref, subdir):
    """Ищет файл грамматики в репозитории сторонней грамматики highlight.js."""
    tree = fetch_json(API_URL.format(owner, repo) + '/git/trees/' + urllib.parse.quote(ref, safe='') + '?recursive=1')
    if tree is None:
        raise Failure(T('{0}/{1}: no branch or tag "{2}"', '{0}/{1}: нет ветки или тега «{2}»').format(owner, repo, ref))
    prefix = subdir.strip('/') + '/' if subdir.strip('/') else ''
    files = []
    for item in tree.get('tree', []):
        path = item['path']
        if item['type'] != 'blob' or not path.startswith(prefix) or not path.endswith('.js'):
            continue
        parts = path.split('/')
        name = parts[-1]
        if NOT_GRAMMAR_DIRS.intersection(parts[:-1]) or name.endswith(('.min.js', '.config.js', '.conf.js')):
            continue
        if name in ('index.js', 'gulpfile.js', 'Gruntfile.js') or name.startswith('.'):
            continue
        files.append(path)
    # Обычное место — src/languages/<язык>.js, у старых репозиториев — src/ или корень.
    for tier in (lambda p: re.match(r'(.*/)?src/languages/[^/]+$', p),
                 lambda p: re.match(r'(.*/)?src/[^/]+$', p),
                 lambda p: p.count('/') == prefix.count('/')):
        found = [p for p in files if tier(p)]
        if len(found) == 1:
            return found[0]
        if len(found) > 1:
            break
    else:
        found = files
        if len(found) == 1:
            return found[0]
    if not found:
        raise Failure(T('{0}/{1}: no grammar file found; give the script a link to it',
                        '{0}/{1}: файл грамматики не найден; дайте скрипту ссылку на него').format(owner, repo))
    raise Failure(T('{0}/{1}: several candidate files, give the script a link to one of them:\n  {2}',
                    '{0}/{1}: подходят несколько файлов, дайте скрипту ссылку на нужный:\n  {2}').format(
        owner, repo, '\n  '.join(BLOB_URL.format(owner, repo, ref, p) for p in found)))


def locate(spec, ref):
    """Разбирает аргумент: имя языка highlight.js, ссылку или путь к файлу."""
    if re.match(r'^https?://', spec):
        github = GITHUB_RE.match(spec)
        raw = RAW_GITHUB_RE.match(spec)
        if github:
            owner, repo, kind, url_ref, path = github.groups()
            repo = re.sub(r'\.git$', '', repo)
            if kind in ('blob', 'raw') and path:
                return github_origin(owner, repo, url_ref, path)
            branch = url_ref or default_branch(owner, repo)
            return github_origin(owner, repo, branch, find_grammar_file(owner, repo, branch, path or ''))
        if raw:
            owner, repo, url_ref, path = raw.groups()
            return github_origin(owner, repo, url_ref, path)
        return Origin(UrlSource(), spec, posixpath.basename(urllib.parse.urlsplit(spec).path))
    if os.path.exists(spec) or spec.endswith('.js') and ('/' in spec or os.sep in spec):
        return Origin(FileSource(), os.path.abspath(spec), os.path.basename(spec))
    name = spec[:-3] if spec.endswith('.js') else spec
    if not ID_RE.match(name):
        raise Failure(T('"{0}" is neither a highlight.js language name, nor a link, nor a file',
                        '«{0}» — не имя языка highlight.js, не ссылка и не файл').format(spec))
    return Origin(GitHubSource(HLJS[0], HLJS[1], ref), 'src/languages/' + name + '.js', name + '.js')


def github_origin(owner, repo, ref, path):
    path = urllib.parse.unquote(path)
    return Origin(GitHubSource(owner, repo, ref), path, posixpath.basename(path))


def default_id(origin):
    name = origin.name.lower()
    name = re.sub(r'(\.es)?(\.min)?\.[cm]?js$', '', name)
    return name


# --- Разбор исходника --------------------------------------------------------

HEADER_KEYS = ('Language', 'Description', 'Category', 'Requires', 'Website',
               'Author', 'Authors', 'Contributors', 'Maintainer', 'Audit')


def parse_header(text):
    """Поля из заголовка-комментария грамматики (Language:, Requires: ...)."""
    match = re.match(r'\s*(?:([\'"])use strict\1;?\s*)?/\*(.*?)\*/', text, re.S)
    fields = {}
    if not match:
        return fields
    key = None
    for raw in match.group(2).splitlines():
        line = re.sub(r'^\s*\*?\s?', '', raw).strip()
        field = re.match(r'(' + '|'.join(HEADER_KEYS) + r')\s*:\s*(.*)$', line)
        if field:
            key = field.group(1)
            fields[key] = field.group(2).strip()
        elif key and line and re.match(r'\s{2,}', raw):
            fields[key] += ' ' + line   # продолжение многострочного Description
        else:
            key = None
    return fields


def grammar_aliases(text):
    match = re.search(r'\baliases\s*[:=]\s*\[([^\]]*)\]', text)
    return re.findall(r'[\'"]([^\'"]+)[\'"]', match.group(1)) if match else []


def grammar_name(text):
    match = re.search(r'^\s*name\s*:\s*([\'"])(.+?)\1', text, re.M)
    return match.group(2) if match else None


# Импорты модулей: import ... from '...', import '...', export ... from '...', require('...').
MODULE_SPEC_RES = (
    re.compile(r'^[ \t]*(?:import|export)\b[^;\'"]*?\bfrom\s*([\'"])([^\'"\n]+)\1', re.M),
    re.compile(r'^[ \t]*import\s*([\'"])([^\'"\n]+)\1', re.M),
    re.compile(r'\brequire\s*\(\s*([\'"])([^\'"\n]+)\1\s*\)'),
)


def module_specs(text):
    """[(начало, конец, путь модуля)] для каждого импорта в тексте."""
    found = set()
    for pattern in MODULE_SPEC_RES:
        for match in pattern.finditer(text):
            found.add((match.start(2), match.end(2), match.group(2)))
    return sorted(found)


def is_relative(spec):
    return spec.startswith('./') or spec.startswith('../')


def load_dependency(source, base, spec):
    target = source.join(base, spec)
    if target is None:
        raise Failure(T('import "{0}" points outside the repository', 'импорт «{0}» ведёт за пределы репозитория').format(spec))
    candidates = [target] if re.search(r'\.[cm]?js$', target) else [target + '.js', target + '/index.js']
    for candidate in candidates:
        text = source.read(candidate)
        if text is not None:
            return candidate, text
    raise Failure(T('{0}: imported file "{1}" not found', '{0}: не найден импортируемый файл «{1}»').format(
        source.link(base), spec))


def collect_dependencies(source, location, text):
    """Все файлы, которые грамматика импортирует (и они — дальше по цепочке).
    Возвращает ({путь модуля в главном файле: файл}, {файл: текст})."""
    direct = {}
    files = {}
    queue = [(location, text)]
    while queue:
        base, body = queue.pop(0)
        for _, _, spec in module_specs(body):
            if not is_relative(spec):
                continue
            target, dep_text = load_dependency(source, base, spec)
            if base == location:
                direct[spec] = target
            if target not in files and target != location:
                files[target] = dep_text
                queue.append((target, dep_text))
    return direct, files


def unique_name(text, wanted):
    """Имя, которое ещё не объявлено в файле: wanted, wanted2, ..."""
    name, number = wanted, 1
    while re.search(r'\b(?:var|let|const|function|class)\s+' + re.escape(name) + r'\b'
                    r'|^\s*import\b[^;]*\b' + re.escape(name) + r'\b', text, re.M):
        number += 1
        name = wanted + str(number)
    return name


CJS_SHIM = 'var module = { exports: {} }, exports = module.exports;'


def detach_grammar(text):
    """Убирает экспорт грамматики из исходника. Возвращает (текст, выражение,
    дающее функцию грамматики) — её забирает объект языка в конце файла."""
    match = re.search(r'^export\s+default\s+', text, re.M)
    if match:
        before, rest = text[:match.start()], text[match.end():]
        named = re.match(r'function\s+([A-Za-z_$][\w$]*)\s*\(', rest)
        if named:                                 # export default function name(hljs) {
            return before + rest, named.group(1)
        if re.match(r'function\s*\(', rest):      # export default function(hljs) {
            name = unique_name(text, 'grammar')
            return before + re.sub(r'^function\s*\(', 'function ' + name + '(', rest), name
        ident = re.match(r'([A-Za-z_$][\w$]*)[ \t]*;?[ \t]*(?:\r?\n|$)', rest)
        if ident:                                 # export default hljsGrammar;
            return before + rest[ident.end():], ident.group(1)
        name = unique_name(text, 'grammar')       # export default (hljs) => ...
        return before + 'const ' + name + ' = ' + rest, name

    # CommonJS. Свои module/exports объявляем в начале файла, иначе сборщик
    # примет файл за CommonJS-модуль и не даст добавить к нему export default.
    if re.search(r'^hljs\.registerLanguage\(', text, re.M):
        raise Failure(T('this is a browser build of the grammar (it registers itself in a global hljs); '
                        'use the source file of the grammar instead (usually src/languages/<name>.js)',
                        'это браузерная сборка грамматики (сама регистрируется в глобальном hljs); '
                        'возьмите исходный файл грамматики (обычно src/languages/<имя>.js)'))
    register = re.search(r'\.registerLanguage\(\s*([\'"])[^\'"]+\1\s*,\s*([A-Za-z_$][\w$]*)\s*\)', text)
    if register and re.search(r'\bfunction\s+' + re.escape(register.group(2)) + r'\s*\(', text):
        expression = register.group(2)            # module.exports = function(hljs) { hljs.registerLanguage('x', fn) }
    elif re.search(r'\bmodule\.exports\s*=', text):
        expression = 'module.exports'             # module.exports = function(hljs) {...}
    else:
        raise Failure(T('cannot find the grammar: the file has neither "export default" nor "module.exports"',
                        'не найдена грамматика: в файле нет ни «export default», ни «module.exports»'))
    if not re.search(r'\b(?:let|const|class)\s+(?:module|exports)\b', text):
        shim = CJS_SHIM + '\n'
        header = re.match(r'\s*/\*.*?\*/\s*', text, re.S)
        cut = header.end() if header else 0
        text = text[:cut] + shim + text[cut:]
    return text, expression


def rewrite_imports(text, mapping):
    """Подменяет пути импортов главного файла на пути к скопированным файлам."""
    out, last = [], 0
    for start, end, spec in module_specs(text):
        if spec in mapping:
            out.append(text[last:start])
            out.append(mapping[spec])
            last = end
    out.append(text[last:])
    return ''.join(out)


# --- Что уже есть в highlight/ -----------------------------------------------

def language_files():
    return sorted(f for f in os.listdir(HIGHLIGHT_DIR) if f.endswith('.js') and not f.startswith('_'))


def existing_languages():
    """{id: имя файла} для языков, которые уже лежат в highlight/."""
    found = {}
    for name in language_files():
        with open(os.path.join(HIGHLIGHT_DIR, name), encoding='utf-8') as handle:
            text = handle.read()
        ids = re.findall(r'^\s*id\s*:\s*([\'"])([^\'"]+)\1', text, re.M)
        found[ids[-1][1] if ids else name[:-3]] = name
    return found


def installed_hljs_version():
    """Версия highlight.js, которую ставит плагин (package-lock.json)."""
    try:
        with open(os.path.join(PLUGIN_DIR, 'package-lock.json'), encoding='utf-8') as handle:
            lock = json.load(handle)
        return lock['packages']['node_modules/highlight.js']['version']
    except Exception:
        pass
    try:
        with open(os.path.join(PLUGIN_DIR, 'package.json'), encoding='utf-8') as handle:
            return re.sub(r'^[^\d]*', '', json.load(handle)['dependencies']['highlight.js'])
    except Exception:
        return 'main'


# --- Запись файла языка ------------------------------------------------------

def js_string(value):
    return "'" + value.replace('\\', '\\\\').replace("'", "\\'").replace('\n', '\\n') + "'"


def language_object(lang_id, label, hint, keywords, grammar):
    lines = ['export default {', '  id: ' + js_string(lang_id) + ',']
    if label and label != lang_id:
        lines.append('  label: ' + js_string(label) + ',')
    if hint:
        lines.append('  hint: ' + js_string(hint) + ',')
    if keywords:
        lines.append('  keywords: ' + js_string(keywords) + ',')
    lines += ['  grammar: ' + grammar + ',', '};', '']
    return '\n'.join(lines)


def full_header(label, origin, version, vendored, cjs):
    source = origin.source
    link = source.link(origin.location)
    if isinstance(source, GitHubSource) and source.is_hljs():
        what = T('highlight.js {0} grammar'.format(version), 'грамматика highlight.js {0}'.format(version))
        license_line = T('License: BSD-3-Clause, ', 'Лицензия: BSD-3-Clause, ') + HLJS_LICENSE
    else:
        what = T('highlight.js grammar', 'грамматика для highlight.js')
        license_line = T('License: see the source.', 'Лицензия: см. источник.')
    if RU:
        lines = [
            '{0} — {1}, перенесена в формат плагина скриптом'.format(label, what),
            SCRIPT + '.',
            'Источник: ' + link,
            license_line,
            '',
            'Ниже — исходный файл грамматики. Изменён только экспорт: грамматику',
            'забирает объект языка в конце файла.',
        ]
        if cjs:
            lines.append('Файл написан как модуль CommonJS, поэтому в начало добавлена строка с module/exports.')
        if vendored:
            lines.append('Импорты ведут на копии импортируемых файлов в highlight/_hljs/.')
        lines += [
            'Правила можно править прямо здесь; затем пересоберите языки',
            '(highlight/_compile.sh) и перезапустите Redmine.',
        ]
    else:
        lines = [
            '{0}: {1}, converted to the plugin format by'.format(label, what),
            SCRIPT + '.',
            'Source: ' + link,
            license_line,
            '',
            'Below is the original grammar file. Only its export was changed: the',
            'language object at the end of the file takes the grammar.',
        ]
        if cjs:
            lines.append('The file is a CommonJS module, so a line declaring module/exports was added at the top.')
        if vendored:
            lines.append('Imports point to copies of the imported files in highlight/_hljs/.')
        lines += [
            'The rules can be edited right here; then rebuild the languages',
            '(highlight/_compile.sh) and restart Redmine.',
        ]
    return '\n'.join(('// ' + line).rstrip() for line in lines) + '\n'


def npm_header(label, name):
    if RU:
        lines = ['{0} — встроенная грамматика highlight.js (из пакета, версия — в package-lock.json).'.format(label),
                 'Файл создан скриптом ' + SCRIPT + ' --npm.']
    else:
        lines = ['{0}: built-in highlight.js grammar (from the npm package, see package-lock.json).'.format(label),
                 'Created by ' + SCRIPT + ' --npm.']
    return '\n'.join('// ' + line for line in lines) + '\n' + \
        "import grammar from 'highlight.js/lib/languages/{0}';\n".format(name)


def rel_display(path):
    return os.path.relpath(path, PLUGIN_DIR).replace(os.sep, '/')


def write_text(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8', newline='\n') as handle:
        handle.write(text)


def convert(spec, args, installed, existing, planned):
    """Переносит один язык. Возвращает список предупреждений."""
    origin = locate(spec, args.ref or installed)
    source = origin.source
    core = isinstance(source, GitHubSource) and source.is_hljs()
    text = source.read(origin.location)
    if text is None:
        if core and source.ref != 'main' and fetch(RAW_URL.format(HLJS[0], HLJS[1], 'main', origin.location)):
            raise Failure(T('highlight.js {0} has no language "{1}"; it exists in the main branch: add --ref main',
                            'в highlight.js {0} нет языка «{1}»; он есть в ветке main: добавьте --ref main').format(
                source.ref, origin.name[:-3]))
        if core:
            raise Failure(T('highlight.js {0} has no language "{1}" (see --list)',
                            'в highlight.js {0} нет языка «{1}» (см. --list)').format(source.ref, origin.name[:-3]))
        raise Failure(T('not found: {0}', 'не найдено: {0}').format(spec))
    text = text.replace('\r\n', '\n')

    lang_id = args.id or default_id(origin)
    if not ID_RE.match(lang_id):
        raise Failure(T('"{0}" cannot be a language id (allowed: a-z, 0-9, "-", "_"); set one with --id',
                        '«{0}» не годится в id языка (можно a-z, 0-9, «-», «_»); задайте его через --id').format(lang_id))
    target = os.path.join(HIGHLIGHT_DIR, lang_id + '.js')
    owner_file = existing.get(lang_id)
    if owner_file and owner_file != lang_id + '.js':
        raise Failure(T('id "{0}" is already used by highlight/{1}', 'id «{0}» уже занят: highlight/{1}').format(lang_id, owner_file))
    if os.path.exists(target) and not args.force:
        raise Failure(T('highlight/{0}.js already exists; to replace it, add --force',
                        'highlight/{0}.js уже есть; чтобы заменить, добавьте --force').format(lang_id))

    header = parse_header(text)
    aliases = grammar_aliases(text)
    label = args.label or header.get('Language') or grammar_name(text) or lang_id
    keywords = args.keywords if args.keywords is not None else ' '.join(a for a in aliases if a != lang_id)
    warnings = []
    vendored = []

    if args.npm:
        if not core:
            raise Failure(T('--npm works only for languages of highlight.js itself',
                            '--npm работает только для языков самого highlight.js'))
        if source.ref != installed:
            warnings.append(T('--npm takes the grammar from the installed highlight.js {0}, --ref is ignored',
                              '--npm берёт грамматику из установленного highlight.js {0}, --ref не учитывается').format(installed))
        content = npm_header(label, origin.name[:-3]) + '\n' + language_object(lang_id, label, args.hint, keywords, 'grammar')
    else:
        direct, files = collect_dependencies(source, origin.location, text)
        vendor_root = os.path.join(VENDOR_DIR, source.vendor_dir(lang_id))
        layout = source.vendor_paths(origin.location, files.keys())
        mapping = {}
        for spec_text, location in direct.items():
            path = os.path.join(vendor_root, *layout[location].split('/'))
            mapping[spec_text] = './' + os.path.relpath(path, HIGHLIGHT_DIR).replace(os.sep, '/')
        for location, dep_text in sorted(files.items()):
            vendored.append((os.path.join(vendor_root, *layout[location].split('/')), dep_text.replace('\r\n', '\n')))
        body, grammar = detach_grammar(text)
        body = rewrite_imports(body, mapping)
        cjs = CJS_SHIM in body
        content = full_header(label, origin, source.ref if core else '', bool(vendored), cjs) + '\n' + \
            body.strip('\n') + '\n\n' + language_object(lang_id, label, args.hint, keywords, grammar)
        for _, _, spec_text in module_specs(body):
            if not is_relative(spec_text) and not spec_text.startswith('highlight.js'):
                warnings.append(T('imports the package "{0}", which the plugin does not install: the build will fail',
                                  'импортирует пакет «{0}», которого нет в зависимостях плагина: сборка упадёт').format(spec_text))
        if core and source.ref != installed:
            warnings.append(T('the grammar is taken from {0}, while the plugin highlights with highlight.js {1}; '
                              '_compile.sh will check that it works',
                              'грамматика взята из {0}, а подсвечивает плагин движком highlight.js {1}; '
                              '_compile.sh проверит, что она работает').format(source.ref, installed))

    required = [r.strip()[:-3] if r.strip().endswith('.js') else r.strip()
                for r in header.get('Requires', '').split(',') if r.strip()]
    missing = [r for r in required if r not in existing and r not in planned and r != lang_id]
    if missing:
        warnings.append(T('needs languages that are not in highlight/: {0}; without them embedded code stays '
                          'uncolored. To add: python3 {1} {2}',
                          'нужны языки, которых нет в highlight/: {0}; без них вложенный код останется без цвета. '
                          'Добавить: python3 {1} {2}').format(', '.join(missing), SCRIPT, ' '.join(missing)))

    print('{0}  <-  {1}'.format(rel_display(target), source.link(origin.location)))
    print('   ' + T('label: {0}; search words: {1}', 'название: {0}; слова для поиска: {1}').format(
        label, keywords or T('none', 'нет')))
    for path, dep_text in vendored:
        state = ''
        if os.path.exists(path):
            with open(path, encoding='utf-8') as handle:
                same = handle.read() == dep_text
            if same:
                state = T(' (already there)', ' (уже есть)')
            elif not args.force:
                state = T(' (differs, kept; --force replaces it)', ' (отличается, оставлен; --force заменит)')
                warnings.append(T('{0} differs from the source and was kept', '{0} отличается от источника и оставлен').format(rel_display(path)))
        print('   + ' + rel_display(path) + state)
    for warning in warnings:
        print('   ! ' + warning)

    if not args.dry_run:
        for path, dep_text in vendored:
            if not os.path.exists(path) or args.force:
                write_text(path, dep_text)
        write_text(target, content)
    existing[lang_id] = lang_id + '.js'
    return warnings


# --- Список языков -----------------------------------------------------------

def parse_supported_languages(markdown):
    """Строки таблицы SUPPORTED_LANGUAGES.md: (название, [псевдонимы], ссылка на пакет)."""
    rows = []
    for line in markdown.splitlines():
        cells = [c.strip() for c in line.strip().strip('|').split('|')]
        if not line.startswith('|') or len(cells) < 2 or cells[0] in ('Language', '') or cells[0].startswith(':'):
            continue
        package = cells[2] if len(cells) > 2 else ''
        link = re.search(r'\((https?://[^)\s]+)\)', package)
        rows.append((cells[0], [a.strip() for a in cells[1].split(',') if a.strip()], link.group(1) if link else ''))
    return rows


def list_languages(ref, pattern):
    listing = fetch_json(API_URL.format(*HLJS) + '/contents/src/languages?ref=' + urllib.parse.quote(ref, safe=''))
    if listing is None:
        raise Failure(T('highlight.js has no version or branch "{0}"', 'в highlight.js нет версии или ветки «{0}»').format(ref))
    names = sorted(item['name'][:-3] for item in listing if item['type'] == 'file' and item['name'].endswith('.js'))
    rows = parse_supported_languages(fetch(RAW_URL.format(HLJS[0], HLJS[1], ref, 'SUPPORTED_LANGUAGES.md')) or '')
    titles = {}
    for title, aliases, link in rows:
        for alias in aliases:
            if not link and alias in names and alias not in titles:
                titles[alias] = title
                break
    have = existing_languages()
    needle = (pattern or '').lower()

    def wanted(*texts):
        return not needle or any(needle in t.lower() for t in texts)

    print(T('highlight.js {0} languages ({1}; * = already in highlight/):',
            'Языки highlight.js {0} ({1}; * — уже есть в highlight/):').format(ref, len(names)))
    for name in names:
        if wanted(name, titles.get(name, '')):
            print('  {0} {1:<18} {2}'.format('*' if name in have else ' ', name, titles.get(name, '')))
    third = [row for row in rows if row[2] and wanted(row[0], ' '.join(row[1]))]
    if third:
        print()
        print(T('Third-party grammars (give the script the link to the repository or to the grammar file):',
                'Сторонние грамматики (дайте скрипту ссылку на репозиторий или на файл грамматики):'))
        for title, aliases, link in third:
            print('    {0:<28} {1:<22} {2}'.format(title, ', '.join(aliases), link))


# --- Уборка ------------------------------------------------------------------

def prune(dry_run):
    """Удаляет из _hljs/ файлы, которые больше не импортирует ни один язык."""
    if not os.path.isdir(VENDOR_DIR):
        print(T('highlight/_hljs/ is empty, nothing to remove', 'highlight/_hljs/ пуст, удалять нечего'))
        return
    used = set()
    queue = [os.path.join(HIGHLIGHT_DIR, f) for f in os.listdir(HIGHLIGHT_DIR) if f.endswith('.js')]
    while queue:
        path = queue.pop()
        with open(path, encoding='utf-8') as handle:
            text = handle.read()
        for _, _, spec in module_specs(text):
            if not is_relative(spec):
                continue
            target = os.path.normpath(os.path.join(os.path.dirname(path), spec))
            for candidate in ([target] if re.search(r'\.[cm]?js$', target) else [target + '.js', os.path.join(target, 'index.js')]):
                if os.path.isfile(candidate) and candidate not in used:
                    used.add(candidate)
                    queue.append(candidate)
                    break
    removed = 0
    for folder, dirs, files in os.walk(VENDOR_DIR, topdown=False):
        for name in files:
            path = os.path.normpath(os.path.join(folder, name))
            if path not in used:
                print('   - ' + rel_display(path))
                removed += 1
                if not dry_run:
                    os.remove(path)
        if not dry_run and not os.listdir(folder):
            os.rmdir(folder)
    if dry_run:
        print(T('unused files: {0} (--dry-run: nothing removed)',
                'неиспользуемых файлов: {0} (--dry-run: ничего не удалено)').format(removed))
    else:
        print(T('unused files removed: {0}', 'удалено неиспользуемых файлов: {0}').format(removed))


# --- Запуск ------------------------------------------------------------------

def parse_args(argv):
    parser = argparse.ArgumentParser(
        prog='convert_hljs_language.py',
        description=T(
            'Converts highlight.js grammars into language files of the plugin (the highlight/ folder). '
            'Grammars: https://github.com/highlightjs/highlight.js/tree/main/src/languages',
            'Переносит грамматики highlight.js в языки плагина (папка highlight/). '
            'Грамматики: https://github.com/highlightjs/highlight.js/tree/main/src/languages'),
        epilog=T('After converting: sh highlight/_compile.sh, then restart Redmine. Details: highlight/README/en.md',
                 'После переноса: sh highlight/_compile.sh и перезапуск Redmine. Подробно: highlight/README/ru.md'))
    parser.add_argument('languages', nargs='*', metavar='LANGUAGE', help=T(
        'language name from highlight.js (routeros, erlang, ...), a link to a grammar file or to a '
        'third-party grammar repository on GitHub, or a path to a local .js file',
        'имя языка highlight.js (routeros, erlang, ...), ссылка на файл грамматики или на репозиторий '
        'сторонней грамматики на GitHub, или путь к локальному .js'))
    parser.add_argument('--ref', help=T(
        'highlight.js version (tag), branch or commit to take languages from; by default the version the '
        'plugin uses (package-lock.json)',
        'версия (тег), ветка или коммит highlight.js, откуда брать языки; по умолчанию — версия, '
        'на которой работает плагин (package-lock.json)'))
    parser.add_argument('--id', help=T('language id (default: the file name); only for one language',
                                       'id языка (по умолчанию — имя файла); только для одного языка'))
    parser.add_argument('--label', help=T('name in the language picker and on the code block (default: "Language:" from the grammar)',
                                          'название в списке языков и на блоке кода (по умолчанию — «Language:» из грамматики)'))
    parser.add_argument('--hint', help=T('grey note next to the name in the picker', 'серая подсказка рядом с названием в списке'))
    parser.add_argument('--keywords', help=T('extra search words, space-separated (default: the grammar aliases)',
                                             'доп. слова для поиска через пробел (по умолчанию — псевдонимы грамматики)'))
    parser.add_argument('--npm', action='store_true', help=T(
        'write a short file that takes the grammar from the installed highlight.js package instead of copying its code',
        'короткий файл, который берёт грамматику из установленного пакета highlight.js, а не копию кода'))
    parser.add_argument('--force', action='store_true', help=T('replace existing files', 'заменять существующие файлы'))
    parser.add_argument('--dry-run', action='store_true', help=T('show what would be done, change nothing',
                                                                 'показать, что будет сделано, ничего не меняя'))
    parser.add_argument('--list', nargs='?', const='', metavar='FILTER', help=T(
        'list highlight.js languages (and third-party grammars), optionally filtered by a word',
        'список языков highlight.js (и сторонних грамматик), можно с фильтром по слову'))
    parser.add_argument('--prune', action='store_true', help=T(
        'delete files in highlight/_hljs/ that no language imports any more',
        'удалить из highlight/_hljs/ файлы, которые больше не импортирует ни один язык'))
    args = parser.parse_args(argv)
    if not args.languages and args.list is None and not args.prune:
        parser.print_help()
        sys.exit(2)
    if len(args.languages) > 1 and (args.id or args.label or args.hint or args.keywords is not None):
        parser.error(T('--id, --label, --hint and --keywords need exactly one language',
                       '--id, --label, --hint и --keywords — только для одного языка'))
    return args


def main(argv=None):
    for stream in (sys.stdout, sys.stderr):
        if not hasattr(stream, 'reconfigure'):
            continue
        # В консоли Windows Python пишет через её собственный API, а в
        # Git Bash и при перенаправлении — в кодировке ANSI (cp1251), и
        # русский текст превращается в кракозябры. Там пишем UTF-8.
        # Построчный вывод — чтобы ошибки (stderr) шли вперемешку с остальным
        # в том же порядке, а не все разом в начале.
        if os.name == 'nt' and not stream.isatty() and not os.environ.get('PYTHONIOENCODING'):
            stream.reconfigure(encoding='utf-8', errors='replace', line_buffering=True)
        else:
            stream.reconfigure(errors='replace', line_buffering=True)
    args = parse_args(argv)
    installed = installed_hljs_version()
    try:
        if args.list is not None:
            list_languages(args.ref or installed, args.list)
            return 0
        if args.prune and not args.languages:
            prune(args.dry_run)
            return 0
    except Failure as error:
        print(T('Error: ', 'Ошибка: ') + str(error), file=sys.stderr)
        return 1

    existing = existing_languages()
    planned = set(default_id_safe(spec) for spec in args.languages)
    failed = 0
    done = 0
    for spec in args.languages:
        try:
            convert(spec, args, installed, existing, planned)
            done += 1
        except Failure as error:
            failed += 1
            print(T('{0}: error: {1}', '{0}: ошибка: {1}').format(spec, error), file=sys.stderr)
    if args.prune:
        prune(args.dry_run)
    if done and not args.dry_run:
        print()
        print(T('Next: build the languages and restart Redmine:', 'Дальше: соберите языки и перезапустите Redmine:'))
        print('  sh highlight/_compile.sh')
    elif done:
        print(T('(--dry-run: nothing written)', '(--dry-run: ничего не записано)'))
    return 1 if failed else 0


def default_id_safe(spec):
    """id, который получит язык из аргумента, — без обращения к сети."""
    name = spec.rstrip('/').split('/')[-1].split('?')[0]
    return re.sub(r'(\.es)?(\.min)?\.[cm]?js$', '', name.lower())


if __name__ == '__main__':
    sys.exit(main())
