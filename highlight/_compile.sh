#!/bin/sh
# Builds all highlight languages from this folder into one file that the plugin
# loads: assets/javascripts/tiptap_highlight.js.
#
# Every *.js in this folder is one language (files and folders starting with "_" are
# shared parts, not languages). To add a language, put a file here and run this script.
# Each language is checked before the build (_check.mjs): if any of them is broken,
# the build stops and the previous tiptap_highlight.js stays in place.
# After the build restart Redmine: it publishes the plugin assets at startup.
#
# The build runs in a node:20-alpine docker container, like the main bundle.
# If there is no Docker but Node.js 18+ is available, it runs right on this machine.
# Details: README/ru.md, README/en.md.
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

    # check: each language is built as a separate module, loaded, and made to
    # highlight a sample text with the same engine that runs in the browser
    npx esbuild $langs --bundle --format=esm --charset=utf8 --log-level=warning \
        --outdir="$tmp/check" --out-extension:.js=.mjs
    node highlight/_check.mjs "$tmp"/check/*.mjs

    # entry point: imports all languages and puts their list into window,
    # where the main editor bundle picks it up
    entry="$tmp/entry.js"
    list=""
    n=0
    for f in $langs; do
        echo "import L$n from \"$(pwd)/$f\";" >> "$entry"
        list="$list L$n,"
        n=$((n + 1))
    done
    echo "window.TiptapHighlightLanguages = [$list];" >> "$entry"

    # --charset=utf8: otherwise every Cyrillic letter (there are many in 1C) is encoded
    # as a six-byte escape sequence and the file grows threefold
    npx esbuild "$entry" --bundle --format=iife --minify --charset=utf8 \
        --log-level=warning --outfile=assets/javascripts/tiptap_highlight.js
    echo "highlight languages built: $n"
'

if docker info >/dev/null 2>&1; then
    docker run --rm -v "$PLUGIN_DIR":/plugin -w /plugin node:20-alpine sh -c "$BUILD"
elif command -v node >/dev/null 2>&1 && command -v npm >/dev/null 2>&1; then
    cd "$PLUGIN_DIR" && sh -c "$BUILD"
else
    echo "Docker or Node.js 18+ is required for the build" >&2
    exit 1
fi
