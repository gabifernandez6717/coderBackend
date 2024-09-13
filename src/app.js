//express
const express = require('express')
const session = require("express-session")
const expressHandlebars = require('express-handlebars')
//Generales
const cors = require('cors')
const path = require('path')
const { Server } = require('socket.io')
//Passport
const initialzePassport = require ("./config/passport.config.js")
const passport = require("passport")
//Coockies
const coockieParser = require("cookie-parser")
const claveCookies = "coderClave"
const MongoStore = require("connect-mongo")
//Routers
const productRouter = require('./dao/fs/productss.router.js')
const cartsRouter = require('./routes/carts.router.js')
const viewsRouter = require('./routes/views.router.js')
const productsRouter = require('./routes/products.router.js')
const sessionsRouter = require("./routes/sessions.router.js")
//Managers
const CartManager = require('./dao/db/manager/cart.manager.js')
const cartManager = new CartManager()

//DB
const Database = require("./config/db.js")
const config = require('./config/config.js')
//Servidor
const PORT = config.PORT
const app = express()
//Midlewares
app.use(express.json())// Poder procesar datos JSON
app.use(coockieParser(claveCookies))// Trabajar con cookies
app.use(session({
        secret: "secretCoder",
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: "mongodb+srv://gabito2005usa:clustercoder@gabito2005usa.awcycim.mongodb.net/CoderBackend"
        })
    })
)//Trabajar con sessions
app.use(express.urlencoded({extended: true}))// Recibir info de req.body
app.use('/public', express.static(path.join(__dirname, 'public')))// Config de la carpeta public
app.use(cors())

//Passport
initialzePassport()
app.use(passport.initialize())
app.use(passport.session())

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
//http://localhost:8080/api/carts
app.use("/api/carts", cartsRouter)
//http://localhost:8080/api/products
app.use("/api/products", productsRouter)
//http://localhost:8080/api/sessions
app.use("/api/sessions", sessionsRouter)
//http://localhost:8080/
app.use("/", viewsRouter)

const httpServer = app.listen(PORT, (req, res) => {
    console.log(`listening on:
        
        http://localhost:${PORT}/
        
        http://localhost:${PORT}/login
        
        http://localhost:${PORT}/register
        
        http://localhost:${PORT}/profile
        
        http://localhost:${PORT}/api/products
        
        http://localhost:${PORT}/api/carts/
        
        http://localhost:${PORT}/realtimeproducts
        `)
    })
module.exports= httpServer

//Chat
const io = new Server(httpServer)
let mensajes=[]
io.on("connection", (socket)=>{
    //Chat
    socket.on("mensaje", (data)=>{
        mensajes.push(data)
        socket.emit("mensajesLogs", mensajes)
    })
    //Real time products
    socket.emit("clientConnection", "Conexion exitosa")
    socket.on("addproduct", async (data)=>{
        await productRouter.addProduct(data)
    })
    socket.on("deleteProductById", async (data)=>{
        await productRouter.deleteProductById(Number(data))
    })
    socket.on("addProductToCart", async (data)=>{
        const cid = data.product.cid
        const pid = data.product.pid
        await cartManager.addProductToCart(cid, pid)
    })
})

//DB
const environment = async () => {await Database.connect()}
environment()