const socket = io()

socket.on("clientConnection", (data)=>{
    console.log(data);
})
//Agregar un producto
document.getElementById("addToCart").addEventListener("submit", async (e)=>{
    //capturar los valores
    let product = {
        pid: document.getElementById('pid').value,
        cid: document.getElementById('cid').value
    };
    console.log(product);
    //console.log(document.getElementById('pid').value);
    socket.emit('addProductToCart', {product})
    await e.preventDefault()
})