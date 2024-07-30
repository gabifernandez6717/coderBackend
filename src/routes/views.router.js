const express = require('express')
const router = express.Router()
const ProductManager = require(`../dao/db/manager/product.manager`)
const productManager = new ProductManager()
const CartManager = require("../dao/db/manager/cart.manager")
const cartManager = new CartManager()

// http://localhost:8080/
router.get('/', async (req, res) => {
    const product = await productManager.getProducts()
    res.render("home", {products: product.docs})
})

// http://localhost:8080/products
router.get('/products', async (req, res) => {
    const limit = req.query. limit
    const page = req.query.page
    const query = req.query.query
    const value = req.query.value
    const sort = req.query.sort
    const products = await productManager.getProducts(limit, page, query, value, sort)
    res.render("products", {
        products: products.docs,
        currentPage: products.page,
        totalPages: products.totalPages,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        nextPage: products.nextPage,
        prevage: products.prevage
        })
})

// http://localhost:8080/carts/:cid
router.get('/carts/:cid', async (req, res) => {
    const id = req.params.cid
    if (id) {
        try {
            const cart = await cartManager.getCart(id)
            if (cart) {
                console.log(cart)
                res.status(200).render("cart", {
                    cartId: id,
                    products: cart.products
                })
            } else {
                res.status(500).render({error: "error interno del servidor."})
            }
        } catch (error) {
            res.status(500).render({error: "error interno del servidor."})
            console.log(error);
        }
    } else {
        res.status(404).render({error: "Proporcione un id valido."})
    }
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