#!/bin/sh

# Restaure la base de données à partir du dump présent dans backups/database_dumps donné en argument
# Restaure également les fichiers media à partir de backups/media_exports

cd /app/api/

DUMP_FILE="../backups/database_dumps/$1"
MEDIA_BACKUP_DIR=../backups/media_exports/
MEDIA_DIR=media

echo "Les données actuellement en base de données vont être écrasées par les données restaurées. Cette opération est IRREVERSIBLE !!"

python manage.py migrate # si la base de données est neuve
python manage.py flush --no-input # supprimer toutes les données existantes pour éviter IntegrityError en cas de clés dupliquées
python manage.py loaddata $DUMP_FILE

mkdir -p $MEDIA_DIR
rsync -a $MEDIA_BACKUP_DIR $MEDIA_DIR