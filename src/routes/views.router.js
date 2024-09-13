const express = require('express')
const router = express.Router()
const ProductManager = require(`../dao/db/manager/product.manager`)
const productManager = new ProductManager()
const CartManager = require("../dao/db/manager/cart.manager")
const cartManager = new CartManager()
const { passportCall, authorization } = require('../utils/passportCall.js')

// http://localhost:8080/
router.get('/', passportCall("jwt"),authorization("user"), async (req, res) => {
    const {limit,page,query,value,sort} = req.query
    const product = await productManager.getProducts(limit,page,query,value,sort)
    res.render("home", {products: product.docs})
})

// http://localhost:8080/products
router.get('/products', async (req, res) => {
    const {limit,page,query,value,sort} = req.query
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
router.get('/realtimeproducts', authorization("admin"), async (req, res) => {
    const product = await productManager.getProducts()
    const products = product.docs
    res.render("realTimeProducts", {products})
})

//http://localhost:8080/chat
router.get('/chat', async (req, res) => {
    res.render("chat")
})

//MODULO DOS

//http://localhost:8080/login
router.get("/login", (req, res) => {
    if (req.session.login) {
        return res.redirect("/")
    }
    res.render("login")
})

//http://localhost:8080/logout
router.get("/logout",async (req, res) => {
    if (req.session.login) {
        await req.user.destroy()
        await req.session.destroy()
        return
    }
    res.redirect("/login")
})

//http://localhost:8080/register
router.get("/register", async (req, res) => {
    if (req.session.login) {
        return res.redirect("/")
    }
    res.render("register")
})

//http://localhost:8080/profile
router.get("/profile",passportCall("jwt"), (req, res) => {
    if (!req.session.login) {
        return res.redirect("/login")
    }
    const user =  req.session.user
    res.render("profile", {user: user})
})

module.exports = router