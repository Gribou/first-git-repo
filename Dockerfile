FROM nodejs:latest-alpine

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
