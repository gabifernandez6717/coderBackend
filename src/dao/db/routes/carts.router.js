const Router = require('express')
const CartModel = require('../../models/carts.model.js')
const router = Router()

//Eliminar un product de un cart por su id
router.delete("/:cid/products/:pid", async (req, res) => {
    const cid = req.params.cid
    if (id) {
        try {
            const cart = await CartModel.findById(cid)
            console.log(cart);
            if (cart) {
                
            } else {
                
            }
            res.status(200).send("Cart eliminado correctamente "+carts)
        } catch (error) {
            res.status(500).send("error interno del servidor.")
            console.log(error);
        }
    } else {
        res.status(404).send("Proporcione un id valido.")
    }
})
//Actualizar un cart por su id
router.put("/:cid", async (req, res) => {
    const id = req.params.cid
    const cartUpdated = req.body
    if (id) {
        try {
            const carts = await CartModel.findByIdAndUpdate(id,cartUpdated)
            res.status(200).send("Cart actualizado correctamente "+carts)
        } catch (error) {
            res.status(500).send("error interno del servidor.")
            console.log(error);
        }
    } else {
        res.status(404).send("Proporcione un id valido.")
    }
})
//Actualizar la cantidad de products de un cart
router.put("/:cid/products/:pid", async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.cid
    const cartUpdated = req.body
    if (id) {
        try {
            const carts = await CartModel.findByIdAndUpdate(id,cartUpdated)
            res.status(200).send("Cart actualizado correctamente "+carts)
        } catch (error) {
            res.status(500).send("error interno del servidor.")
            console.log(error);
        }
    } else {
        res.status(404).send("Proporcione un id valido.")
    }
})
//Eliminar los product de un cart por su id
router.delete("/:id", async (req, res) => {
    const id = req.params.id
    if (id) {
        try {
            const carts = await CartModel.findByIdAndDelete(id)
            res.status(200).send("Cart eliminado correctamente "+carts)
        } catch (error) {
            res.status(500).send("error interno del servidor.")
            console.log(error);
        }
    } else {
        res.status(404).send("Proporcione un id valido.")
    }
})
//Eliminar un cart por su id
router.delete("/c/:id", async (req, res) => {
    const id = req.params.id
    if (id) {
        try {
            const carts = await CartModel.findByIdAndDelete(id)
            res.status(200).send("Cart eliminado correctamente "+carts)
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
        const carts = await CartModel.find()
        console.log(JSON.stringify(carts, null, 2));
        res.status(200).send(carts)
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
            const carts = await CartModel.find({_id:id})
            console.log(JSON.stringify(carts,null,2));
            res.status(200).send(carts)
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
    console.log(cartData);
    try {
        if (product) {
            const cart = new CartModel(cartData)
            cart.products.push({productId: product})
            await cart.save()
            console.log(JSON.stringify(cart,null,2));
            res.status(200).send("Cart creado correctamente " + cart)
        } else {
            const cart = new CartModel(cartData)
            await cart.save()
            console.log(cart);
            res.status(200).send("Cart creado correctamente " + cart)
        }

    } catch (error) {
        res.status(500).send("error interno del servidor.")
        console.log(error);
    }
})




module.exports = router
