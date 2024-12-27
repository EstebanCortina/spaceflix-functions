# Spaceflix Functions
Estas funciones son de Firebase Cloud Functions. Su finalidad es realizar una logica especifica al momento de ser invocadas por HTTP/HTTPS.

Internamente son contenedores que se levantan y apagan, por lo que su modelo de negocio principal es por invocacion pero tambien por procesamiento y ancho de banda. Leer [Plan Blaze](https://firebase.google.com/pricing) para mas info.

## Setup
- ``
    cd ./functions &&
    npm install
``

## Iniciar de manera local
- Primero debes incluir el archivo .env adentro de la carpeta functions. Este archivo debe contener todas las variables de entorno que necesitan las funciones
- Despues se debe ejecutar el emulador.
- ``firebase emulators:start``
- En consola apareceran los links de cada function para poder ser invocada.