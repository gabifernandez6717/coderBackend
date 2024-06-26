const express = require('express')
const router = express.Router()
const ProductManager = require(`../managers/productManager`)
const productManager = new ProductManager("src/data/products.json")

// http://localhost:8080/
router.get('/', async (req, res) => {
    const product = await productManager.getProducts()
    const products = JSON.parse(product);
    res.render("home", {products})
})

// http://localhost:8080/realtimeproducts
router.get('/realtimeproducts', async (req, res) => {
    const product = await productManager.getProducts()
    const products = JSON.parse(product);
    res.render("realTimeProducts", {products})
})

//http://localhost:8080/chat
router.get('/chat', async (req, res) => {
    res.render("chat")
})
module.exports = router