#!/bin/sh
#
# source $HOME/desarrollo/mediabros_repos/fynapp_frontend/run_fynapp_frontend.sh
# 2021-11-24 | CR
#
# Especifica donde esta este script, que debe ser el directorio del repositorio...
cd "`dirname "$0"`" ;
SCRIPTS_DIR="`pwd`" ;
#
cd ${SCRIPTS_DIR};
# npm install
npm start
