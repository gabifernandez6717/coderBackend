const Router = require('express');
const router = Router()
const ProductManager = require(`../managers/productManager`)
const productManager = new ProductManager("src/data/products.json")

//Funciones para capturar algun error

//Obtener productos
async function getProducts(limit){
    try {
        const response = await productManager.getProducts(limit)
        console.log(response)
        return response
    } catch (error) {
        console.error(error);
    }
}
//Obtener un producto por su id
async function getProductsById (id){
    try {
        const response = await productManager.getProductsById(id)
        console.log(response)
        return response
    } catch (error) {
        console.error(error);
    }
}
//Agregar un producto
async function addProduct({title, description, price, img, code, stock, status, category}){
    try {
        const response = await productManager.addProduct({title, description, price, img, code, stock, status, category})
        console.log(response)
        return response
    } catch (error) {
        console.error(error);
    }
}
//Editar un producto
async function editedProduct (id, dataProduct){
    try {
        const response = await productManager.editedProductById(id, dataProduct)
        console.log(response)
        return response
    } catch (error) {
        console.error(error);
    }
}
//Eliminar producto por su id
async function deleteProductById(id){
    try {
        const response = await productManager.deleteProductById(id)
        return response
    } catch (error) {
        console.error(error);
    }
}

//Rutas

//Listar todos los productos (con o sin limit)
//http://localhost:8080/api/products
router.get("/", async (req, res) => {
    const limit = Number(req.query.limit)
    const products = await getProducts(limit)
    if (products) {
        return res.status(200).send(products)
    } else {
        res.status(401).send("Hubo un error al obtener los productos")
    }
})

//Mostrar un producto por su id
//http://localhost:8080/api/products/:id
router.get("/:id", async(req, res) => {
    const id = Number(req.params.id)
    const products = await getProductsById(id)
    if (products) {
        return res.status(200).send(products)
    } else {
        res.status(401).send("Hubo un error al obtener el producto")
    }
})

//Agregar un producto
//http://localhost:8080/api/products
router.post("/", async (req, res) => {
    const product = req.body
    console.log(product);
    console.log(typeof product);
    const products = await addProduct(product)
    if (products) {
        return res.status(200).send(products)
    } else {
        res.status(401).send("Hubo un error al agregar los productos")
    }
})
//Product de ejemplo:
// {
//     "title": "Smartphone Galaxy S21",
//     "description": "El último smartphone de Samsung con pantalla AMOLED y cámara de alta resolución.",
//     "price": 799.99,
//     "img": "galaxy.com",
//     "code": 1223,
//     "stock": 8,
//     "status": true,
//     "category": "electronica"
// }

//Editar un producto por su id
//http://localhost:8080/api/products/:id
router.put("/:id", async (req, res) => {
    const id = Number(req.params.id)
    const dataProduct = req.body
    const product = await editedProduct(id, dataProduct)
    if (product) {
        return res.status(200).send(`Producto con id: ${id} actualizado correctamente`)
    } else {
        res.status(401).send("Hubo un error al actualizar el producto")
    }
})

//Eliminar un producto por su id
//http://localhost:8080/api/products/:id
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id)
    const products = deleteProductById(id)
    if (products) {
        res.status(200).send(`Producto con id: ${id} eliminado correctamente`)
    } else {
        res.status(401).send("Hubo un error al eliminar el producto")
    }
})

module.exports = {router, getProducts, getProductsById, addProduct, editedProduct, deleteProductById}