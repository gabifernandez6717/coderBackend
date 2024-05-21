const ProductManager = require(`../src/managers/productManager`)
//Nueva instancia
const productManager = new ProductManager()

//Agregar productos
async function addProduct(title, description, price, img, code, stock){
    try {
    productManager.addProduct(title, description, price, img, code, stock)
    } catch (error) {
        console.error(error);
    }
}
//Obtener productos
async function getProducts(){
    try {
        console.log(productManager.getProducts());
    } catch (error) {
        console.error(error);
    }
}
//Obtener productos por su id
async function getProductsById (id){
    try {
        console.log( productManager.getProductsById(id))
    } catch (error) {
        console.error(error);
    }
}

getProducts()//Mostrar un array vacio

//Agregar productos
addProduct(`celular`, `celular ultimo modelo`, 1000, 'celular.com', 123, 10)
addProduct(`computadora`, `computadora que anda muy rapido`, 10000, 'computadora.com', 124, 10)
addProduct(`termo`, `termo que calienta el agua solo`, 100, 'termo.com', 125, 10)
addProduct(`mate`, `mate que nunca rompe la montañita`, 90, 'mate.com', 126, 10)
//addProduct(`mate`, `mate que nunca rompe la montañita`, 90, 'mate.com', 126, 10)//Crear un producto con el campo code repetido

getProducts()//Mostrar el array de productos
getProductsById(3)//Obtener un producto por su id (3)
//getProductsById(36)//Buscar un producto con un id inexistente (36)



