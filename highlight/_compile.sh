#!/bin/sh
# Собирает все языки подсветки из этой папки в один файл, который подключает
# плагин: assets/javascripts/tiptap_highlight.js.
#
# Каждый *.js в этой папке — один язык (файлы и папки с «_» в начале — общие
# куски, а не языки). Добавить язык = положить сюда файл и запустить этот скрипт.
# Перед сборкой каждый язык проверяется (_check.mjs): если какой-то сломан,
# сборка останавливается, а прежний tiptap_highlight.js остаётся на месте.
# После сборки перезапустите Redmine: ассеты плагина он публикует при старте.
#
# Сборка идёт в docker-контейнере node:20-alpine, как и у основного бандла.
# Если Docker нет, но есть Node.js 18+, — прямо на этой машине.
# Подробно — README/ru.md, README/en.md.
set -e

PLUGIN_DIR="$(cd "$(dirname "$0")/.." && pwd)"

BUILD='
    set -e
    [ -d node_modules/highlight.js ] || npm install
    tmp=$(mktemp -d)
    trap "rm -rf \"$tmp\"" EXIT

    langs=""
    for f in highlight/*.js; do
        case "$(basename "$f")" in _*) continue ;; esac
        langs="$langs $f"
    done

    # проверка: каждый язык собирается отдельным модулем, загружается и
    # раскрашивает пробный текст тем же движком, что работает в браузере
    npx esbuild $langs --bundle --format=esm --charset=utf8 --log-level=warning \
        --outdir="$tmp/check" --out-extension:.js=.mjs
    node highlight/_check.mjs "$tmp"/check/*.mjs

    # точка входа: импортирует все языки и кладёт их список в window,
    # откуда его забирает основной бандл редактора
    entry="$tmp/entry.js"
    list=""
    n=0
    for f in $langs; do
        echo "import L$n from \"$(pwd)/$f\";" >> "$entry"
        list="$list L$n,"
        n=$((n + 1))
    done
    echo "window.TiptapHighlightLanguages = [$list];" >> "$entry"

    # --charset=utf8: иначе каждая кириллическая буква (их много в 1С) кодируется
    # шестибайтной escape-последовательностью и файл раздувается втрое
    npx esbuild "$entry" --bundle --format=iife --minify --charset=utf8 \
        --log-level=warning --outfile=assets/javascripts/tiptap_highlight.js
    echo "языков подсветки собрано: $n"
'

if docker info >/dev/null 2>&1; then
    docker run --rm -v "$PLUGIN_DIR":/plugin -w /plugin node:20-alpine sh -c "$BUILD"
elif command -v node >/dev/null 2>&1 && command -v npm >/dev/null 2>&1; then
    cd "$PLUGIN_DIR" && sh -c "$BUILD"
else
    echo "Для сборки нужен Docker или Node.js 18+ / Docker or Node.js 18+ is required" >&2
    exit 1
fi
