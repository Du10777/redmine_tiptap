#!/bin/sh
# Главный build-скрипт плагина: собирает JS и CSS, затем перезапускает Redmine.
set -e

DIR="$(cd "$(dirname "$0")" && pwd)"

echo "== Сборка JS =="
sh "$DIR/assets/javascripts/_build.sh"

echo "== Сборка CSS =="
sh "$DIR/assets/stylesheets/src/_build.sh"

echo "== Перезапуск Redmine =="
docker compose -f ~/redmine/docker-compose.yml restart redmine

echo "== Готово =="
