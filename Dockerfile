ARG GITLAB_DEPENDENCY_PROXY=""
# improve build time by pulling images from gitlab and not dockerhub

FROM ${GITLAB_DEPENDENCY_PROXY}node:17-alpine AS front-builder
# reduce image size by not having react dependencies in final image

ARG PROJECT_DIR=/app/
ARG ASSETS_DIR=/app/web/

ENV BUILD_TARGET_FOLDER=/app/api

WORKDIR $ASSETS_DIR

COPY ./web/package.json ./web/package-lock.json ./
RUN npm install --omit=optional --no-audit

COPY ./web ./

RUN mkdir -p $BUILD_TARGET_FOLDER
COPY ./scripts/post_npm_build.sh ../scripts/post_npm_build.sh

RUN rm -f .env*.local && npm run build

#------------------------------------------------------------------
FROM ${GITLAB_DEPENDENCY_PROXY}python:3.9-slim as back-builder
# reduce image size by having only the required python dependencies in final image

ENV PIPENV_VENV_IN_PROJECT=1
ENV PATH="/app/api/.venv/bin:$PATH"

WORKDIR /app/api
RUN pip install -U pip pipenv
COPY ./api/Pipfile ./api/Pipfile.lock ./
RUN pipenv install

#------------------------------------------------------------------
FROM ${GITLAB_DEPENDENCY_PROXY}python:3.9-slim

ARG HTTPS_PROXY=
ARG HTTP_PROXY=
ARG FTP_PROXY=
ARG NO_PROXY="localhost,127.0.0.1"

ENV https_proxy=$HTTPS_PROXY
ENV http_proxy=$HTTP_PROXY
ENV ftp_proxy=$FTP_PROXY
ENV no_proxy=$NO_PROXY

ENV PIPENV_VENV_IN_PROJECT=1
ENV PATH="/app/api/.venv/bin:$PATH"
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app/api

# copy scripts
COPY ./scripts /app/scripts
RUN chmod +x /app/scripts/*.sh

# Copy the current directory contents into the container
COPY ./api /app/api
RUN chmod 0744 /app/api/manage.py

# Copy built react files from builder into this container
COPY --from=front-builder /app/api/static_web /app/api/static_web
COPY --from=front-builder /app/api/templates_web /app/api/templates_web

# Copy Python dependencies from back-builder into this container
COPY --from=back-builder /app/api/.venv /app/api/.venv

RUN python manage.py collectstatic --noinput

# install poppler-utils for pdftohtml command
RUN apt-get update && apt-get -y install rsync curl poppler-utils && apt-get clean autoclean && apt-get autoremove --yes --purge && rm -rf /var/lib/{apt,dpkg,cache,log}/

# Make port 8000 available for the app
EXPOSE 8000

# Be sure to use 0.0.0.0 for the host within the Docker container,
# otherwise the browser won't be able to find it
CMD python3 manage.py runserver 0.0.0.0:8000


