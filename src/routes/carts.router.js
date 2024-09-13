const express = require('express')
const router = express.Router()
const CartController = require("../controllers/cart.controller.js")
const cartController = new CartController()
//Eliminar un product de un cart por su id
// EJ: http://localhost:8080/api/carts/6699a7b66c99605a411133c4/products/668b30dd5204a4ece4ba74f2
router.delete("/:cid/products/:pid", cartController.deleteProductToCart)

//Actualizar la cantidad de products de un cart
router.put("/:cid/products/:pid", cartController.updateProductsToCart)

//Eliminar los product de un cart por su id
//EJ: http://localhost:8080/api/carts/6699a7b66c99605a411133c4
router.delete("/:cid", cartController.deleteProductsToCart)

//Todos los carts
router.get("/", cartController.getCarts)

//Cart por su id
router.get("/:cid", cartController.getCart)

// Crear un cart
router.post("/", cartController.createCart)

// Agregar products a un cart
router.post("/:cid/product/:pid", cartController.addProductToCart)

//Finalizar el proceso de compra
router.get("/:cid/purchase", cartController.purchase)

module.exports = router