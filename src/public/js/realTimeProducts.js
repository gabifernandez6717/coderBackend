const socket = io()

socket.on("clientConnection", (data)=>{
    console.log(data);
})

//Agregar un producto
document.getElementById("productForm").addEventListener("submit", (e)=>{
    //capturar los valores
    let product = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: parseFloat(document.getElementById('price').value),
        img: document.getElementById('img').value,
        code: parseInt(document.getElementById('code').value),
        stock: parseInt(document.getElementById('stock').value),
        status: document.getElementById('status').checked,
        category: document.getElementById('category').value
    };
    console.log(product);
    socket.emit('addproduct', product)
})

//Elimiinar un producto por su id
document.getElementById("productDeleteForm").addEventListener("submit", (e)=>{
    const id = Number(document.getElementById('id').value)
    console.log(id);
    console.log(typeof id);
    socket.emit('deleteProductById', id)
})