const express = require('express')
const router = express.Router()
const CartManager = require("../dao/db/manager/cart.manager.js")
const cartManager = new CartManager()

//Eliminar un product de un cart por su id
// EJ: http://localhost:8080/api/carts/6699a7b66c99605a411133c4/products/668b30dd5204a4ece4ba74f2
router.delete("/:cid/products/:pid", async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    if (cid && pid) {
        try {
            const cart = await cartManager.deleteProductToCart(cid, pid)
            if (cart) {
                return res.status(200).json(cart)
            } else {
            res.status(500).json({error: "error interno del servidor."})
            }
        } catch (error) {
            res.status(500).json({error: "error interno del servidor."})
            console.log(error);
        }
    } else {
        res.status(404).json({error: "Proporcione un id valido."})
    }
})

//Actualizar la cantidad de products de un cart
router.put("/:cid/products/:pid", async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.cid
    const quantity = req.body
    if (cid && pid) {
        try {
            const cart = await cartManager.updateProductsToCart(cid,pid,quantity)
            if (cart) {
                console.log("Cart actualizado correctamente "+cart);
                res.status(200).json(cart)
            } else {
            res.status(500).json({error: "error interno del servidor."})
            }
        } catch (error) {
            res.status(500).json({error: "error interno del servidor."})
            console.log(error);
        }
    } else {
        res.status(404).send("Proporcione un ids validos.")
    }
})
//EJ PARA REQ.BODY: {"quantity":83}

//Eliminar los product de un cart por su id
//EJ: http://localhost:8080/api/carts/6699a7b66c99605a411133c4
router.delete("/:cid", async (req, res) => {
    const cid = req.params.cid
    if (cid) {
        try {
            const cart = await cartManager.deleteProductsToCart(cid)
            console.log("Products del cart eliminados correctamente "+cart);
            res.status(200).json(cart)
        } catch (error) {
            res.status(500).json({error: "error interno del servidor."})
            console.log(error);
        }
    } else {
        res.status(404).json({error: "Proporcione un id valido."})
    }
})

//Todos los carts
router.get("/", async (req, res) => {
    try {
        const carts = await cartManager.getCarts()
        if (carts) {
            console.log(carts);
            res.status(200).json(carts)
        } else {
            res.status(500).json({error: "error interno del servidor."})
        }
    } catch (error) {
        res.status(500).json({error: "error interno del servidor."})
        console.log(error);
    }
})
//Cart por su id
router.get("/:cid", async (req, res) => {
    const id = req.params.cid
    if (id) {
        try {
            const cart = await cartManager.getCart(id)
            if (cart) {
                console.log(cart)
                res.status(200).json(cart)
            } else {
                res.status(500).json({error: "error interno del servidor."})
            }
        } catch (error) {
            res.status(500).json({error: "error interno del servidor."})
            console.log(error);
        }
    } else {
        res.status(404).json({error: "Proporcione un id valido."})
    }
})
router.post("/", async (req, res) => {
    const cartData = req.body
    const product = req.query.product
    try {
        const cart = await cartManager.createCart(cartData, product)
        if (cart) {
            console.log("Cart creado correctamente "+cart)
            res.status(200).json(cart)
        } else {
            res.status(500).json({error: "error interno del servidor."})
        }
    } catch (error) {
        res.status(500).json({error: "error interno del servidor."})
        console.log(error);
    }
})

module.exports = router
