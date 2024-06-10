const express = require('express')
const productRouter = require('./routes/products.router.js')
const cartsRouter = require('./routes/carts.router.js')
const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Rutas
//http://localhost:8080/api/products
app.use("/api/products", productRouter)
//http://localhost:8080/api/carts
app.use("/api/carts", cartsRouter)


app.listen(PORT, (req, res) => {
    console.log(`listening on http://localhost:${PORT}/`);
})