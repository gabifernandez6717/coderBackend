const socket = io()
// Chat
let usuario

const chatBox = document.getElementById('chatBox')

Swal.fire({
    title: "identificate maestro",
    input: "text",
    text: "ingresa un usuario para identificarte",
    inputValidator: (value)=>{
        return!value && "pone un nombre"
    },
    allowOutsideClick: false
}).then(result=>{
    usuario= result.value
})
chatBox.addEventListener("keyup", (event)=>{
    if (event.key === "Enter") {
        if (chatBox.value.trim().length>0) {
            socket.emit("mensaje", {
                usuario: usuario,
                mensaje: chatBox.value
            })
            chatBox.value = ""
        }
    }
})

socket.on("mensajesLogs", (data)=>{
    const mensajesLog = document.getElementById("messagesLogs")
    let mensajes = ""
    data.forEach(mensaje => {
        mensajes+= `
            <div class="message">
                <span class="user">${mensaje.usuario}</span>
                <div class="text"> ${mensaje.mensaje}</div>
            </div>
        `
    });
    mensajesLog.innerHTML = mensajes
})
