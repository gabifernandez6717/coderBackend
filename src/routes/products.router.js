const express = require('express')
const router = express.Router()
const ProductManager = require("../dao/db/manager/product.manager")
const productManager = new ProductManager()

//Rutas

// http://localhost:8080/api/products/
router.get("/", async (req, res)=>{
    const limit = req.query.limit
    const page = req.query.page
    const query = req.query.query
    const value = req.query.value
    const sort = req.query.sort
    try {
        const products = await productManager.getProducts(limit,page,query,value,sort)
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({error: "error interno del servidor."})
        console.log(error);
    }
})

//Obtener un product por su id
// http://localhost:8080/api/products/668b30dd5204a4ece4ba74f5
router.get("/:id", async (req, res)=>{
    const id = req.params.id
    if (id) {
        try {
            const product = await productManager.getProductById(id)
            if (product) {
                res.status(200).json(product)
            } else {
                console.log(error);
                res.status(500).json({error: "error interno del servidor."})
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({error: "error interno del servidor."})
        }
    } else {
        res.status(404).json({error: "debe proporcionar un id."})
    }
})

//Subir un product
// http://localhost:8080/api/products/
router.post("/", async (req, res)=>{
    const product = req.body
    const addProduct = await productManager.addProduct(product)
    try {
        if (addProduct) {
            res.status(200).json(addProduct)
        } else {
            res.status(400).json({error: "No se proporcionó información valida."})
        }
    } catch (error) {
        res.status(500).json({error: "error interno del servidor."})
        console.log(error);
    }
})
//EJ para req.body:
// {
//     "title": "producto ejemplo",
//     "description": "descripcion de ejemplo",
//     "price": 2499.99,
//     "img": "https://example.com/canon-eosr6.jpg",
//     "code": 122829378487,
//     "stock": 4,
//     "status": true,
//     "category": "fotografia"
// }

//Actualizar un product
router.put("/:id", async (req, res)=>{
    const id = req.params.id
    const productUpdated = req.body
    try {
        const product = await productManager.editedProduct(id, productUpdated)
        if (product) {
            res.status(200).json(product)
        } else {
            res.status(500).json({error: "error interno del servidor."})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "error interno del servidor."})
    }
})
//EJ para req.body:
// {
//     "title": "ACTUALIZACION ejemplo"
// }

//Eliminar un product
// http://localhost:8080/api/products/6699a4df07bcfbd345c0796d
router.delete("/:id", async (req, res)=>{
    const id = req.params.id
    try {
        const product = await productManager.deleteProduct(id)
        if (product) {
            res.status(200).json(product)
        } else {
            res.status(500).json({error: "error interno del servidor."})
        }
    } catch (error) {
        res.status(500).json({error: "error interno del servidor."})
        console.log(error);
    }
})

module.exports = router