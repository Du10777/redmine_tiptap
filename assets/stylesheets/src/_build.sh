#!/bin/sh
# Склеивает src/*.css в ../tiptap_editor.css (по порядку префиксов 01_, 02_, ...)
set -e
DIR="$(dirname "$0")"
OUT="$DIR/../tiptap_editor.css"

echo "/* Этот файл склеивается скриптом ./src/_build.sh — не редактировать вручную */" > "$OUT"
for f in "$DIR"/[0-9]*.css; do
  echo "" >> "$OUT"
  cat "$f" >> "$OUT"
done
