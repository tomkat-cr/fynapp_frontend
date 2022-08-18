#!/bin/sh
# Archivo: "1-run-jfrog-container.sh"
# 2022-03-03 | CR
# Ejecutar con: 
# sh -x 1-run-jfrog-container.sh
# source 1-run-jfrog-container.sh

# IMPORTANTE: esto ya no tiene sentido hacerlo, porque en principio pense que no funcionaba hacerlo directamente en el Mac M1
# Y luego al intentar hacerlo en docker corriendo en la M1, comenzo a dar problemas de quemu/incompatibilidad, incluso
# forzando la plataforma intel x86. A la final el problema era otro y se pudo poner a funcionar directamente en el Mac M1.

# google: linux how to get full filespec of a file
# https://www.baeldung.com/linux/get-absolute-path
SCRIPT_FILESPEC="`readlink -f $0`" ;
# /\ Needed to perform the chmod with sudo, because once under sudo current dir is lost and it will say 'file not found'...

# Especifica donde esta el script en la maquina local,
# que debe estar en el mismo directorio de este script:
cd "`dirname "$0"`" ;
SCRIPTS_DIR="`pwd`" ;
export CONTAINER_NAME="jfrog_fynapp_frontend"

# Credenciales desde un .env (deberian ir mas bien en un "Vault")
cd ${SCRIPTS_DIR}
if [ -f ".env" ]; then
    set -o allexport; . "${SCRIPTS_DIR}/.env"; set +o allexport ;
fi

# Hace que el script de instalación sea ejecutable, para poder ejecutarlo directamente con el "docker run"
if [ -x "${SCRIPT_FILESPEC}" ] ;
then
    echo "Script ${SCRIPT_FILESPEC} is already executable" ;
else
    echo "A continuacion introduzca la contraseña del usuario 'root' para hacer ejecutable el script de instalación: ${SCRIPT_FILESPEC}" ;
    sudo chmod +x "${SCRIPT_FILESPEC}" ;
fi

if [ "$1" == "build" ] ;
then
    # Si se pasa "build" como 1er parametro, hace el build
    docker-compose build app ;
fi

if [ "$1" == "down" ] ;
then
    # Si se pasa "down" como 1er parametro, baja los contenedores
    docker-compose down ;
else
    # Levanta el container y lo deja corriendo "daemonized":
    docker-compose up -d ;
    # Muestra los contenedores levantados
    docker-compose ps ;
    # Entra en el contenedor
    docker exec -ti ${CONTAINER_NAME} bash
fi

# Muestra lo que esta pasando en el contenedor
#docker attach ${CONTAINER_NAME}

# Entra en el contenedor
#docker exec -ti ${CONTAINER_NAME} bash
