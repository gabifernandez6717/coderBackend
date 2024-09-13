const express = require('express')
const router = express.Router()
const ProductController = require("../controllers/product.controller.js")
const productController = new ProductController()

router.get("/", productController.getProducts)
router.get("/:id", productController.getProductById)
router.post("/", productController.addProduct)
router.put("/:id", productController.editedProduct)
router.delete("/:id", productController.deleteProductById)

module.exports = router