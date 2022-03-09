#!/bin/bash
# File: fynapp_backend/scripts/jfrog/jfrog_npm_build_publish.sh
# 2022-03-02 | CR
# Run: sh -x /var/scripts/jfrog/jfrog_npm_build_publish.sh

SCRIPTS_DIR="`dirname "$0"`"

# Variables
if [ -f "${SCRIPTS_DIR}/.env" ]; then
    set -o allexport; . "${SCRIPTS_DIR}/.env"; set +o allexport ;
fi

# jfrog config add <server ID>
# --server-id-deploy     [Optional] Artifactory server ID for deployment. The server should configured using the 'jfrog c add' command.
# --server-id-resolve    [Optional] Artifactory server ID for resolution. The server should configured using the 'jfrog c add' command.
# export ARTIFACTORY_SERVER_ID="ver docker-compose.yml"

# --access-token            [Optional] JFrog Platform access token.
# export JFROG_ACCESS_TOKEN="ver docker-compose.yml"

# --url                     [Optional] JFrog platform URL.
# export JFROG_URL="ver docker-compose.yml"

# --repo-deploy          [Optional] Repository for artifacts deployment.
# --repo-resolve         [Optional] Repository for dependencies resolution.
# export ARTIFACTORY_REPO="ver docker-compose.yml"

# --build-number=1.0.0
# export ARTIFACTORY_BUILD_NUMBER="ver docker-compose.yml"
export APP_VERSION="`cat "../../version.txt"`"
if [ "${APP_VERSION}" != "" ]; then
    export ARTIFACTORY_BUILD_NUMBER="${APP_VERSION}" ;
fi

# --build-name=npm-challenge-build
export ARTIFACTORY_BUILD_NAME="${ARTIFACTORY_REPO}-build"

# To configure npm registry
# ARTIFACTORY_REPO_AUTH=XXXXXXX
# ARTIFACTORY_EMAIL=XXXXXX

if [ "${CI_PROJECT_DIR}" = "" ]; then
    export CI_PROJECT_DIR="/usr/src/app" ;
fi
cd "${CI_PROJECT_DIR}/${GIT_REPO_NAME}"

# Npc install all dependecies
npm config set registry https://registry.npmjs.org/
rm package-lock.json
npm install
npm run build

# Configure npm registry
# npm config set registry "${JFROG_URL}/artifactory/api/npm/${ARTIFACTORY_REPO}/"

# touch ~/.npmrc
# echo "_auth = ${ARTIFACTORY_REPO_AUTH}" >> ~/.npmrc
# echo "email = ${ARTIFACTORY_EMAIL}" >> ~/.npmrc
# echo "always-auth = true" >> ~/.npmrc

# Configure the Artifactory server.

jfrog c add ${ARTIFACTORY_SERVER_ID} --access-token ${JFROG_ACCESS_TOKEN} --url ${JFROG_URL} --overwrite=true --interactive=false

# Take the following steps to build the project with npm and resolve the project dependencies from Artifactory.

# Configure the project's npm repositories.

jfrog npm-config --server-id-deploy ${ARTIFACTORY_SERVER_ID} --server-id-resolve ${ARTIFACTORY_SERVER_ID} --repo-deploy ${ARTIFACTORY_REPO} --repo-resolve ${ARTIFACTORY_REPO}

# Build the project with npm and resolve the project dependencies from Artifactory.

# Install the project while resolving the project dependencies from Artifactory.

jfrog npm install --build-name=${ARTIFACTORY_BUILD_NAME} --build-number=${ARTIFACTORY_BUILD_NUMBER}

# Publish the npm Packages into Artifactory

# https://jfrog.com/blog/npm-flies-with-jfrog-cli/

# We recommend adding the Git VCS details using the following build-add-git command

jfrog rt bag ${ARTIFACTORY_BUILD_NAME} ${ARTIFACTORY_BUILD_NUMBER}

# jfrog rt bad --build-name=${ARTIFACTORY_BUILD_NAME} --build-number=${ARTIFACTORY_BUILD_NUMBER}

# Collect environment variables and add them to the build info.

jfrog rt bce ${ARTIFACTORY_BUILD_NAME} ${ARTIFACTORY_BUILD_NUMBER}

# To publish the package, run the following command:

jfrog rt npm-publish --build-name=${ARTIFACTORY_BUILD_NAME} --build-number=${ARTIFACTORY_BUILD_NUMBER}

# Publish the build-info to Artifactory.

# Run the following build publish command:

jfrog rt bp ${ARTIFACTORY_BUILD_NAME} ${ARTIFACTORY_BUILD_NUMBER}
