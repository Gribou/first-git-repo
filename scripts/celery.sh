#!/bin/bash

set -e;

python manage.py wait_for_db
python manage.py wait_for_migrations

echo "Creating superuser if needed..."
python manage.py createsuperuser_custom \
    --username ${SU_USERNAME:-admin} \
    --password ${SU_PASSWORD:-*@dm1n*} \
    --email ${SU_EMAIL:-blank@email.fr} \
    --noinput --preserve

echo "Populating database with default data if needed..."
python manage.py populate

celery -A app purge || true # ignore error
celery -A app beat --loglevel=INFO &
celery -A app worker -E -Q ${CELERY_QUEUE:-portal}
