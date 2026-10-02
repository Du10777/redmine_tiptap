#!/bin/sh
# Главный build-скрипт плагина: собирает JS, языки подсветки и CSS, затем перезапускает Redmine.
set -e

DIR="$(cd "$(dirname "$0")" && pwd)"

echo "== Сборка JS =="
sh "$DIR/assets/javascripts/_build.sh"

echo "== Сборка языков подсветки =="
sh "$DIR/highlight/_compile.sh"

echo "== Сборка CSS =="
sh "$DIR/assets/stylesheets/src/_build.sh"

echo "== Перезапуск Redmine =="
docker compose -f ~/redmine/docker-compose.yml restart redmine

echo "== Готово =="
