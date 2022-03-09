#!/bin/bash
# File: fynapp_frontend/scripts/docker_build_vars.sh
# 2022-02-25 | CR
#
# Parameters
if [ "$1" != "" ]; then
    export APP_VERSION="$1";
else
    export APP_VERSION="`cat "`dirname "$0"`/../../version.txt"`"
fi
export DOCKER_ACCOUNT="mediabros"
# export DOCKER_PASSWORD="xxx" # Defined on the CI/CD Secure Variables
export DOCKER_APP_NAME="fynapp_frontend"
export DOCKER_APP_VERSION="v${APP_VERSION}-amd64"
export DOCKER_APP_PORTS="3001:3001"
