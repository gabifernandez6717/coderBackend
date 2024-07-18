const express = require('express')
const router = express.Router()
const ProductManager = require("../manager/product.manager.js")
const productManager = new ProductManager()

//Rutas
router.get("/", async (req, res)=>{
    const limit = req.query.limit
    const page = req.query.page
    const query = req.query.query
    const value = req.query.value
    const sort = req.query.sort
    try {
        const products = await productManager.getProducts(limit,page,query,value,sort)
        console.log(products);
        res.status(200).render("home",{
            products: products.docs,
            currentPage: products.page,
            totalPages: products.totalPages,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            nextPage: products.nextPage,
            prevPage: products.prevPage
        })
    } catch (error) {
        res.status(500).send("error interno del servidor.")
        console.log(error);
    }
})
//Obtener un product por su id
router.get("/:id", async (req, res)=>{
    const id = req.params.id
    if (id) {
        try {
            const product = await productManager.getProductById(id)
            if (product) {
                res.status(200).render("home",
                {
                    products: product.docs,
                    currentPage: product.page,
                    totalPages: product.totalPages,
                    hasPrevPage: product.hasPrevPage,
                    hasNextPage: product.hasNextPage,
                    nextPage: product.nextPage,
                    prevPage: product.prevPage
                })
            } else {
                console.log(error);
                res.status(500).send("Error interno del servidor")
            }
        } catch (error) {
            console.log(error);
            res.status(500).send("Error interno del servidor")
        }
    } else {
        res.status(404).send("debe proporcionar un id")
    }
})

//Subir un product
router.post("/", async (req, res)=>{
    const product = req.body
    const addProduct = await productManager.addProduct(product)
    try {
        if (addProduct) {
            res.status(200).send("Product agregado")
        } else {
            res.status(400).send("No se proporcionó información.")
        }
    } catch (error) {
        res.status(500).send("error interno del servidor.")
        console.log(error);
    }
})
//Actualizar un product
router.put("/:id", async (req, res)=>{
    const id = req.params.id
    const productUpdated = req.body
    try {
        const product = await productManager.editedProduct(id, productUpdated)
        if (product) {
            res.status(200).send("Product actualizado")
        } else {
            res.status(500).send("error interno del servidor.")
        }
    } catch (error) {
        res.status(500).send("error interno del servidor.")
        console.log(error);
    }
})
//Eliminar un product
router.delete("/:id", async (req, res)=>{
    const id = req.params.id
    try {
        const product = await productManager.deleteProduct(id)
        if (product) {
            res.status(200).send("Product eliminado")
        } else {
            res.status(500).send("error interno del servidor.")
        }
    } catch (error) {
        res.status(500).send("error interno del servidor.")
        console.log(error);
    }
})
module.exports = router