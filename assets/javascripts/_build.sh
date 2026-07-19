#!/bin/sh
# Сборка JS-бандла через esbuild в docker-контейнере node:20-alpine.
set -e

PLUGIN_DIR="$(cd "$(dirname "$0")/../.." && pwd)"

docker run --rm -v "$PLUGIN_DIR":/plugin node:20-alpine sh -c "
    set -e
    cd /plugin &&
    npm install &&
    npx esbuild assets/javascripts/tiptap_init.js --bundle --format=iife --global-name=TiptapInit --minify --sourcemap --outfile=assets/javascripts/tiptap_bundle.js
"
