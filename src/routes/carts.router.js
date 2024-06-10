const Router = require('express')
const router = Router()
const CartManager = require('../managers/cartManager')
const cartManager = new CartManager("src/data/carts.json")

//Funciones para capturar algun error

//Crear un cart
async function createCart () {
    try {
        const response = await cartManager.createCart()
        return response
    } catch (error) {
        console.log(error);
    }
}
//Obtener un cart por su id
async function getCart (id){
    try {
        const response = await cartManager.getCart(id)
        return response
    } catch (error) {
        console.log(error);
    }
}
//Agregar un producto a un cart
async function addProductToCart(cartId, productId) {
    try {
        const response = await cartManager.addProductToCart(cartId, productId)
        return response
    } catch (error) {
        console.log(error);
    }
}
//Eliminar un cart por su id
async function deleteCart (id) {
    try {
        const response = await cartManager.deleteCart(id)
        return response
    } catch (error) {
        console.log(error);
    }
}

//Rutas

//Crear un cart
//http://localhost:8080/api/carts/
router.post('/', async (req, res)=>{
    const response = await createCart()
    if (response) {
        console.log(response);
        return res.status(200).send(response)
    } else {
        res.status(401).send("Hubo un error al crear el cart")
    }
})
//Obtener un cart por su id
//http://localhost:8080/api/carts/:cid
router.get('/:cid', async (req, res)=>{
    const id = Number(req.params.cid)
    const response = await getCart(id)
    if (response) {
        console.log(response);
        return res.status(200).send(response)
    } else {
        res.status(401).send("Hubo un error al obtener el cart")
    }
})
//Agregar un producto a un cart
//http://localhost:8080/api/carts/:cid/product/:pid
router.post('/:cid/product/:pid', async (req, res)=>{
    const cartId = Number(req.params.cid)
    const productId = Number(req.params.pid)
    const response = await addProductToCart(cartId, productId)
    if (response) {
        console.log(response);
        return res.status(200).send(response)
    } else {
        res.status(401).send("Hubo un error al agregar el producto al cart")
    }
})

//Eliminar un cart por su id
//http://localhost:8080/api/carts/:cid/
router.delete('/:cid', async (req, res)=>{
    const id = Number(req.params.cid)
    const response = await deleteCart(id)
    if (response) {
        console.log(response);
        return res.status(200).send(response)
    } else {
        res.status(401).send("Hubo un error al eliminar el cart")
    }
})

module.exports = router