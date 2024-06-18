console.log("Probando desde el front")
const socket = io()
socket.emit("message", "Hola!")