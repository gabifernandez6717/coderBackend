const express = require('express')
const path = require('path')
const expressHandlebars = require('express-handlebars')
const productRouter = require('./dao/fs/routesFileSystem/productss.router.js')
const cartsRouter = require('./dao/db/routes/carts.router.js')
const viewsRouter = require('./dao/fs/views.router.js')
const productsRouter = require('./dao/db/routes/products.router.js')
const CartManager = require('./dao/db/manager/cart.manager.js')
const cartManager = new CartManager()
const { Server } = require('socket.io')
const mongoose = require('mongoose')
const PORT = 8080
const app = express()
//Midlewares
app.use(express.json())//Poder procesar datos JSON
app.use(express.urlencoded({extended: true}))//Recibir info de req.body
app.use('/public', express.static(path.join(__dirname, 'public')))//Config de la carpeta public

//Handlebars
app.engine("handlebars", expressHandlebars.engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,//Permite el acceso a las propiedades heredadas.
        allowProtoMethodsByDefault: true//Permite el acceso a los métodos heredados.
    }
}))//Configura el motor de plantillas Handlebars para que pueda ser usado en la aplicación Express
app.set('view engine', 'handlebars')//Establece Handlebars como el motor de vistas predeterminado para la aplicación Express
app.set('views', path.join(`${__dirname}/views`))
//app.set("views",path.join("C:/Users/Gabri/Desktop/backend/src/views"))//Define el directorio donde se encuentran las vistas
app.use(express.static(__dirname + "/public"))

//RUTAS
//fs
// //http://localhost:8080/api/products
// app.use("/api/products", productRouter.router)
// //http://localhost:8080/api/carts
// app.use("/api/carts", cartsRouter)

//chat
//http://localhost:8080/chat
app.use("/", viewsRouter)

//db
//http://localhost:8080/api/carts
app.use("/api/carts", cartsRouter)
//http://localhost:8080/products
app.use("/api/products", productsRouter)

const httpServer = app.listen(PORT, (req, res) => {
    console.log(`listening on:
        
        http://localhost:${PORT}/
        
        http://localhost:${PORT}/api/products
        
        http://localhost:${PORT}/api/carts/
        
        http://localhost:${PORT}/chat
        
        http://localhost:${PORT}/realtimeproducts
        `)
    })
    
module.exports= httpServer
// //Chat
const io = new Server(httpServer)
let mensajes=[]
io.on("connection", (socket)=>{
    console.log("Un cliente se conectó");
    //Chat
    socket.on("mensaje", (data)=>{
        mensajes.push(data)
        socket.emit("mensajesLogs", mensajes)
    })
    //Real time products
    socket.emit("clientConnection", "Cliente conectado!")
    socket.on("addproduct", async (data)=>{
        await productRouter.addProduct(data)
    })
    socket.on("deleteProductById", async (data)=>{
        await productRouter.deleteProductById(data)
    })
    socket.on("addProductToCart", async (data)=>{
        console.log(data);

        const cid = data.product.cid
        const pid = data.product.pid
        console.log(cid);
        console.log(pid);
        await cartManager.addProductToCart(cid, pid)
    })
})
//DB
const environment= async () =>{
    mongoose.connect('mongodb+srv://gabito2005usa:clustercoder@gabito2005usa.awcycim.mongodb.net/CoderBackend')
    .then(()=>{console.log("Conectado a la base de datos");})
    .catch((err)=>{console.log(err);})
}
environment()