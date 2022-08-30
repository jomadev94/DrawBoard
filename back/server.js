// EXPRESS
const express = require("express");
const app = express();

// SOCKET.IO
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: { origins: ["http://localhost:4200"] },
});

// EVENTO QUE DETECTA CUANDO UN DISPOSITIVO SE CONECTA POR WEBSOCKET
io.on("connection", (socket) => {
  // IDENTIFICADOR DE CADA CONEXION TCP AL SERVIDDR
  const idHandShake = socket.id;

  // TOMAMOS EL PARAMETRO PASADO DESDE EL FRONT (SALA)
  const { nameRoom } = socket.handshake.query;

  // UNIMOS EL DISPOSITIVO AL GRUPO/SALA QUE OBTUVIMOS
  socket.join(nameRoom);

  // ESCUCHA UN EVENTO Y HACE BROADCAST. ENVIA LOS DATOS A TODOS
  // LOS QUE SE ENCUENTRAN EN LA SALA
  socket.on("event", (res) => {
    socket.to(nameRoom).emit("event", res);
  });

  // SOCKET.TO: ENVIO BROADCAST NO INCLUYENTE
  // SOCKET.EMIT: ENVIO BROADCAST INCLUYENTE
});

//LEVANTAMOS LA APP DE EXPRESS
http.listen(5000, () => {
  console.log("Socket listo y escuchado en el puerto 5000");
});
