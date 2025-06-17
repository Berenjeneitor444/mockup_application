#!/bin/bash

# Habilita la detección de errores
set -e

# Obtener nombre y versión de package.json
NAME=$(jq -r .name package.json)
VERSION=$(jq -r .version package.json)

# extract the version without labels (ie: 1.0.0)
RELEASE_VERSION=${VERSION%%-*}
# extract the label from version (ie: rc.12)
VERSION_LABEL=${VERSION#*-}

DIST_DIR="./dist/app/browser"
VERSIONS_DIR="./dist/versions"
PROD_ZIP_FILE="${VERSIONS_DIR}/${NAME}_${RELEASE_VERSION}+${VERSION_LABEL}.zip"
STAGING_ZIP_FILE="${VERSIONS_DIR}/${NAME}_${VERSION}.zip"

SENTRY_ORG=majestic-resorts
SENTRY_PROJECT=checkin-paperless
SENTRY_VERSION="${RELEASE_VERSION}+${VERSION_LABEL}"

# 🔧 Generar version.ts para que Angular pueda usarla en Sentry.init()
VERSION_FILE="./src/environments/version.ts"
echo "// Auto-generated file" > "$VERSION_FILE"
echo "export const appVersion = '${SENTRY_VERSION}';" >> "$VERSION_FILE"
echo "📄 Versión escrita en $VERSION_FILE: ${SENTRY_VERSION}"

echo "🎨 Ejecutando format..."
npm run format

echo "🔍 Ejecutando lint..."
npm run lint || { echo "❌ Error en lint, deteniendo proceso."; exit 1; }

# Prepare dist folder
mkdir -p "$VERSIONS_DIR"

echo "🔨 Ejecutando build de la versión de producción..."
npm run build

# SENTRY
echo "🚀 Creando release en Sentry..."
sentry-cli releases new "$SENTRY_VERSION" --org "$SENTRY_ORG" --project "$SENTRY_PROJECT"
sentry-cli releases set-commits "$SENTRY_VERSION" --auto  --org "$SENTRY_ORG" --project "$SENTRY_PROJECT"
sentry-cli releases finalize "$SENTRY_VERSION" --org "$SENTRY_ORG" --project "$SENTRY_PROJECT"
echo "🚀 Subiendo sourcemaps a Sentry..."
sentry-cli sourcemaps inject --org "$SENTRY_ORG" --project "$SENTRY_PROJECT" ./dist
sentry-cli sourcemaps upload --org "$SENTRY_ORG" --project "$SENTRY_PROJECT" ./dist

echo "📦 Creando archivo ZIP: $ZIP_FILE..."
rm -f "$PROD_ZIP_FILE"  # removes the zip if it exists
zip -r "$PROD_ZIP_FILE" "$DIST_DIR"
echo "✅ Archivo ZIP generado: $PROD_ZIP_FILE"


echo "🔨 Ejecutando build de la versión de producción..."
npm run build:staging
echo "📦 Creando archivo ZIP: $STAGING_ZIP_FILE..."
rm -f "$STAGING_ZIP_FILE"  # removes the zip if it exists
zip -r "$STAGING_ZIP_FILE" "$DIST_DIR"
echo "✅ Archivo ZIP generado: $STAGING_ZIP_FILE"
