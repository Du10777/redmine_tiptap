#!/bin/sh
# Concatenates src/*.css into ../tiptap_editor.css (in the order of the prefixes 01_, 02_, ...)
set -e
DIR="$(dirname "$0")"
OUT="$DIR/../tiptap_editor.css"

echo "/* This file is assembled by ./src/_build.sh - do not edit it by hand */" > "$OUT"
for f in "$DIR"/[0-9]*.css; do
  echo "" >> "$OUT"
  cat "$f" >> "$OUT"
done
