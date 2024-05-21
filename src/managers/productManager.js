class ProductManager {
    constructor(){
        //Array de productos
        this.products = []
    }
    //Agregar productos
    addProduct (title, description, price, img, code, stock){
        //validar que se agreguen todos los campos
        if (title && description && price && code && stock && img) {
            //Validar que el campo code no se repita
            if (this.products.some(product => product.code === code)) {
                console.log(`el codigo ${code} ya esta en uso.`);
                return
            }
            //Crear id autincrementable
            const idAutoincrementable = this.products.length+1
            //crear nuevo producto
            const newProduct = {
                id: idAutoincrementable,
                title,
                description,
                price,
                img,
                code,
                stock
            }
            //Agregar el prodcto al array de productos
            this.products.push(newProduct)
        } else {
            console.log(`Todos los campos son obligatorios`);
            return
        }
    }

    //Obtener productos
    getProducts (){
        return this.products
    }

    //Obtener productos por su id
    getProductsById (id) {
        const product = this.products.find(product => product.id === id)
        if (product) {
            return product
        } else {
            console.log("Not found");
        }
    }

}
module.exports = ProductManager