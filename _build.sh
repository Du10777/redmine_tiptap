#!/bin/sh
# Main build script of the plugin: builds JS, highlight languages and CSS, then restarts Redmine.
set -e

DIR="$(cd "$(dirname "$0")" && pwd)"

echo "== Building JS =="
sh "$DIR/assets/javascripts/_build.sh"

echo "== Building highlight languages =="
sh "$DIR/highlight/_compile.sh"

echo "== Building CSS =="
sh "$DIR/assets/stylesheets/src/_build.sh"

echo "== Restarting Redmine =="
docker compose -f ~/redmine/docker-compose.yml restart redmine

echo "== Done =="
