#!/bin/bash

curl --fail http://localhost:${WEB_PORT:-8000}/api/health/ || exit 1