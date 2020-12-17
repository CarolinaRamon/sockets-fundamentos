//Funciones que queremos que se disparen cuando recibamos info del servidor o cuando queramos enviar info al servidor:

var socket = io();//Uso var para aumentar la compatibilidad con distintos navegadores web.

//Función que indica si estoy conectado con el servidor:
//Para saber cuando estoy conectado al servidor.
//on se utiliza para escuchar.
socket.on('connect', function() {
    console.log('Conectado al servidor');
});//Con esto, nuestro código de frontend va a estar pendiente de cualquier cambio o cualquier cosa que suceda con el backend. Si se cae la conexión, los sockets van a intentar volver a conectarse. Y lo van a seguir haciendo por un periodo de tiempo que es configurable.

//Código que se ejecuta cuando PERDEMOS la conexión con el servidor:
socket.on('disconnect', function() {
console.log('Se perdió la conexión con el servidor');
});

// Enviar información del front al back:
//Envío un string (enviarMensaje). No se recomienda usar caracteres especiales (ó, ñ, etc.) o espacios. Esto es lo que el servidor va a escuchar.
socket.emit('enviarMensaje', {
    usuario: 'Carolina',//Tengo que mandar el usuario para que el servidor me responda, porque así lo especifiqué en el server.
    mensaje: 'Hola Mundo'
}, function(resp) {
    //console.log('Se disparó el callback');
    console.log('Respuesta del servidor: ', resp);
});//En este caso, emit tiene tres argumentos: nombre del evento, objeto, función que se ejecuta cuando todo sale bien.


//Escuchar info que viene del back:
socket.on('enviarMensaje', function(mensaje) {
    console.log('Servidor:', mensaje);
});

