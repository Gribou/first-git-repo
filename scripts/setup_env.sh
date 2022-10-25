#!/bin/sh

set -e;

# creates an .env file for react building in Gitlab Pipeline (when .env is not reachable because in .gitignore but env variables customizable in Gitlab settings)

touch web/.env

echo "REACT_APP_DEBUG=0" >> web/.env

if [ $SUBDIRECTORY == "root" ]; then
    echo "PUBLIC_URL=/" >> web/.env
    echo "REACT_APP_BACKEND_HOST=" >> web/.env
else
    echo "PUBLIC_URL=/${SUBDIRECTORY}" >> web/.env
    echo "REACT_APP_BACKEND_HOST=/${SUBDIRECTORY}" >> web/.env
fi
