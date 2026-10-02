#!/bin/sh
# Builds the JS bundle with esbuild in a node:20-alpine docker container.
set -e

PLUGIN_DIR="$(cd "$(dirname "$0")/../.." && pwd)"

docker run --rm -v "$PLUGIN_DIR":/plugin node:20-alpine sh -c "
    set -e
    cd /plugin &&
    npm install &&
    npx esbuild assets/javascripts/tiptap_init.js --bundle --format=iife --global-name=TiptapInit --minify --charset=utf8 --sourcemap --outfile=assets/javascripts/tiptap_bundle.js
"
