
const {io} = require('../server');//Importo el objeto para poder utilizarlo acá.


//Para saber cuando un usuario se conecta al server:
io.on('connection', (client)=>{//Para saber qué persona se conectó, socket.io me permite especificar un parámetro (client), que es un objeto que contiene toda la info de la computadora o de la conexión que se estableció.

    console.log('Usuario conectado');

    //Enviamos un mensaje desde el servidor al cliente:
    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta applicación'
    });

    client.on('disconnect', ()=>{
        console.log('Usuario desconectado');
    });

    //Escuchamos al cliente:
    // client.on('enviarMensaje', (mensaje, callback)=>{
    //     console.log(mensaje);
    //     //enviarMensaje es el evento que quiero emitir.
    //     client.emit('enviarMensaje', mensaje);
    //     if(mensaje.usuario){
    //     callback({
    //         resp: 'TODO SALIÓ BIEN!'
    //     });
    //     }else{
    //         callback({
    //             resp: 'TODO SALIÓ MAL!'
    //         });
    //     }  
    // });

    //Reescribo el código anterior:
        client.on('enviarMensaje', (data, callback)=>{ 
    
            console.log(data);
    
            //enviarMensaje es el evento que quiero emitir.
            // client.emit('enviarMensaje', {
            //     usuario: data.usuario,
            //     mensaje: data.mensaje
            // });
            //data contiene lo mismo, así que lo reescribo así:
            client.broadcast.emit('enviarMensaje', data);//Con broadcast todos los usuarios conectados reciben el mensaje.
            
        });

});