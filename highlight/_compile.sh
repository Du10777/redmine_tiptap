#!/bin/sh
# Собирает все языки подсветки из этой папки в один файл, который подключает
# плагин: assets/javascripts/tiptap_highlight.js.
#
# Каждый *.js в этой папке — один язык (файлы с «_» в начале — общие куски,
# а не языки). Добавить язык = положить сюда файл и запустить этот скрипт.
# После сборки перезапустите Redmine: ассеты плагина он публикует при старте.
#
# Сборка идёт в docker-контейнере node:20-alpine, как и у основного бандла.
set -e

PLUGIN_DIR="$(cd "$(dirname "$0")/.." && pwd)"

docker run --rm -v "$PLUGIN_DIR":/plugin node:20-alpine sh -c '
    set -e
    cd /plugin
    [ -d node_modules/highlight.js ] || npm install

    # точка входа: импортирует все языки и кладёт их список в window,
    # откуда его забирает основной бандл редактора
    entry=/tmp/tiptap_highlight_entry.js
    : > "$entry"
    list=""
    n=0
    for f in highlight/*.js; do
        case "$(basename "$f")" in _*) continue ;; esac
        echo "import L$n from \"/plugin/$f\";" >> "$entry"
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
