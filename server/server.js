const express = require('express');

const socketIO = require('socket.io');//socket.io no trabaja directamente con la app express, pero sí trabaja con un servidor http que ya trae por defecto node:
const http = require('http');//Esto nos va a permitir levantar un servidor, entre otras cosas.

const path = require('path');

const app = express();//En realidad express llama funciones de http.
let server = http.createServer(app);//Montamos el servidor con todas las configuraciones que le hacemos al express.


const publicPath = path.resolve(__dirname, '../public');//Creamos un public path para hacer pública la carpeta public.
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));//Usamos el middleware para habilitar la carpeta pública y que todos puedan acceder a ella.

//Inicializamos el socket.io:
//let io = socketIO(server);//Ya no lo voy a tener acá. Lo moví a un archivo aparte.
//IO (input-output) mantiene una conexión directa con el servidor.


//IO = esta es la comunicacion del backend
module.exports.io = socketIO(server);
require('./sockets/socket');


server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});

//Info/Librería en http://localhost:3000/socket.io/socket.io.js
//Si la podemos visualizar, quiere decir que configuramos el socket.io en el backend correctamente.
//El frontend va a utilizar este archivo. Este archivo tiene la configuración para trabajar con el backend y mantener la comunicación abierta entre ambos (front y back).