const express = require('express')
const router = express.Router()
const CartManager = require("../manager/cart.manager.js")
const cartManager = new CartManager()

//Eliminar un product de un cart por su id
// EJ: http://localhost:8080/api/carts/6699a7b66c99605a411133c4/products/668b30dd5204a4ece4ba74f2
router.delete("/:cid/products/:pid", async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    console.log("hasta aca vas bien");
    console.log(cid);
    console.log(pid);
    if (cid && pid) {
        try {
            //console.log(await cartManager.deleteProductToCart(cid, pid));
            const cart = await cartManager.deleteProductToCart(cid, pid)
            if (cart) {
                console.log(`Product eliminado correctamente. ${cart}`)
                return res.status(200).send(`Product eliminado correctamente. ${cart}`)
            } else {
            res.status(500).send("error interno del servidor.")
            }
        } catch (error) {
            res.status(500).send("error interno del servidor.")
            console.log(error);
        }
    } else {
        res.status(404).send("Proporcione unos ids validos.")
    }
})
//Actualizar un cart por su id
router.put("/:cid", async (req, res) => {
    const id = req.params.cid
    const cartUpdated = req.body
    if (id) {
        try {
            const cart = await cartManager.updateCart(id,cartUpdated)
            res.status(200).send("Cart actualizado correctamente "+cart)
        } catch (error) {
            res.status(500).send("error interno del servidor.")
            console.log(error);
        }
    } else {
        res.status(404).send("Proporcione un id valido.")
    }
})
//EJ PARA REQ.BODY:

    // {"products":[
    //             {"productId": "668b30dd5204a4ece4ba74f1",
    //                 "quantity": 3}
    //                 ,{"productId": "668b30dd5204a4ece4ba74f2",
    //                 "quantity": 3}
    //                 ,{"productId": "668b30dd5204a4ece4ba74f3",
    //                 "quantity": 3}
    //                 ,{"productId": "668b30dd5204a4ece4ba74f4",
    //                 "quantity": 3}
    //             ]
    // }

//Actualizar la cantidad de products de un cart
router.put("/:cid/products/:pid", async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.cid
    const quantity = req.body
    if (cid && pid) {
        try {
            const cart = await cartManager.updateProductsToCart(cid,pid,quantity)
            if (cart) {
                res.status(200).send("Cart actualizado correctamente "+cart)
            } else {
            res.status(500).send("error interno del servidor. "+ cart)
            }
        } catch (error) {
            res.status(500).send("error interno del servidor.")
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
            res.status(200).send("Products del cart eliminados correctamente "+cart)
        } catch (error) {
            res.status(500).send("error interno del servidor.")
            console.log(error);
        }
    } else {
        res.status(404).send("Proporcione un id valido.")
    }
})
//Eliminar un cart completo por su id (no lo pedia la consigna pero me facilita para practicar)
//EJ: http://localhost:8080/api/carts/cart/6699a7b66c99605a411133c4
router.delete("/cart/:id", async (req, res) => {
    const id = req.params.id
    if (id) {
        try {
            const cart  = await cartManager.deleteCart(id)
            if (cart) {
                res.status(200).send("Cart eliminado correctamente "+cart)
            } else {
                res.status(500).send("error interno del servidor.")
            }
        } catch (error) {
            res.status(500).send("error interno del servidor.")
            console.log(error);
        }
    } else {
        res.status(404).send("Proporcione un id valido.")
    }
})
//Todos los carts
router.get("/", async (req, res) => {
    try {
        const carts = await cartManager.getCarts()
        if (carts) {
            res.status(200).send(carts)
        } else {
            res.status(500).send("error interno del servidor.")
        }
    } catch (error) {
        res.status(500).send("error interno del servidor.")
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
                res.status(200).render("cart", {cartId: id, products: cart.products})
            } else {
                res.status(500).send("error interno del servidor.")
            }
        } catch (error) {
            res.status(500).send("error interno del servidor.")
            console.log(error);
        }
    } else {
        res.status(404).send("Proporcione un id valido.")
    }
})
router.post("/", async (req, res) => {
    const cartData = req.body
    const product = req.query.product
    try {
        const cart = await cartManager.createCart(cartData, product)
        if (cart) {
            console.log(cart)
            res.status(200).send("Cart creado correctamente")
        } else {
            res.status(500).send("error interno del servidor.")
        }
    } catch (error) {
        res.status(500).send("error interno del servidor.")
        console.log(error);
    }
})

module.exports = router
