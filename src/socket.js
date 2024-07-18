const httpServer = require("./app.js")
const { Server } = require('socket.io')
const CartManager = require("./dao/db/manager/cart.manager.js")
const cartManager = new CartManager()

//Chat
const io = new Server(httpServer)

let mensajes=[]
io.on("connection", (socket)=>{
    console.log("Un cliente se conecto");
    //Chat
    // socket.on("mensaje", (data)=>{
    //     mensajes.push(data)
    //     socket.emit("mensajesLogs", mensajes)
    // })
    // //Real time products
    // socket.emit("clientConnection", "Cliente conectado!")
    // socket.on("addproduct", async (data)=>{
    //     await productRouter.addProduct(data)
    // })
    // socket.on("deleteProductById", async (data)=>{
    //     await productRouter.deleteProductById(data)
    // })
    socket.on("addProductToCart", async (data)=>{
        const cid = data.cid
        const pid = data.pid
        console.log(cid);
        console.log(pid);
        console.log("aaaaaaaaa"+data);
        //await cartManager.addProductToCart(data)//{ product: { pid: '668b30dd5204a4ece4ba74f5', cid: '4' } }
    })
})