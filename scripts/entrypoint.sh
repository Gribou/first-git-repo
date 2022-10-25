#!bin/bash

set -e;

python manage.py wait_for_db

echo "Migrating database..."
python manage.py migrate

gunicorn app.wsgi:application --bind 0.0.0.0:${WEB_PORT:-8000} --access-logfile '-' --error-logfile '-' --log-level 'info' --logger-class app.gunicorn.CustomGunicornLogger
