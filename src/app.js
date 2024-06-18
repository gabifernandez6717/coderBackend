const express = require('express')
const path = require('path')
const expressHandlebars = require('express-handlebars')
const productRouter = require('./routes/products.router.js')
const cartsRouter = require('./routes/carts.router.js')
const viewsRouter = require('./routes/views.router.js')
const { Server } = require('socket.io')
const PORT = 8080
const app = express()

//Midlewares

app.use(express.json())//Poder procesar datos JSON

app.use(express.urlencoded({extended: true}))//Recibir info a req.body

app.use('/public', express.static(path.join(__dirname, 'public')))//Config de la carpeta public

//Handlebars

app.engine("handlebars", expressHandlebars.engine())//Configura el motor de plantillas Handlebars para que pueda ser usado en la aplicación Express

app.set('view engine', 'handlebars')// Establece Handlebars como el motor de vistas predeterminado para la aplicación Express

app.set('views', path.join(__dirname, 'views'))//Define el directorio donde se encuentran las vistas

app.use(express.static(__dirname + "/public"))

//Rutas
//http://localhost:8080/api/products
app.use("/api/products", productRouter)
//http://localhost:8080/api/carts
app.use("/api/carts", cartsRouter)
//http://localhost:8080/
app.use("/", viewsRouter)

const httpServer = app.listen(PORT, (req, res) => {
    console.log(`listening on:

        http://localhost:${PORT}/

        http://localhost:8080/api/products

        http://localhost:8080/api/carts

        http://localhost:8080/
        `)
    })

    const io = new Server(httpServer)

    io.on('connection', (socket) => {
        console.log("Nuevo cliente conectado");
        socket.on("message", data=>{
            console.log(data);
        })
    })