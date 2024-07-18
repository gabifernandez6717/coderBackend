const fs = require('fs');
class ProductManager {
    constructor(path){
        this.products = []//Array de productos
        this.path = path//Ruta del archivo
        this.loadProducts()//Cargar productos al inicializar la instancia
    }
    // Cargar productos
    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8')
            this.products = JSON.parse(data)
        } catch (error) {
            // Si hay un error al leer el archivo, se asume que aún no hay productos
            this.producto = []
        }
    }
    //Guardar cambios
    async guardarArchivo (){
        try {
            fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2), (err, data)=>{
                if (err) {
                    console.log("hubo un error al guardar el archivo");
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    //Leer el archivo con los productos
    async leerArchivo (){
        try {
            const respuesta = await fs.promises.readFile(this.path, "utf-8")
            return respuesta
        } catch (error) {
            console.log(error);
        }
    }

    //Agregar productos
    async addProduct ({title, description, price, img, code, stock, status, category}){
        //validar que se agreguen todos los campos
        if (title && description && price && code && stock && status && category && img) {
            //Validar que el campo code no se repita
            if (this.products.some(product => product.code === code)) {
                console.log(`el codigo ${code} ya esta en uso.`);
                return
            }
            //Crear id autincrementable
            const idAutoincrementable = this.products.length+1
            //Crear nuevo producto
            const newProduct = {
                id: idAutoincrementable,
                title,
                description,
                price,
                img,
                code,
                stock,
                status,
                category
            }
            this.products.push(newProduct)//Agregar el producto al array de productos
            await this.guardarArchivo()
            return("Producto creado correctamente")
        } else {
            console.log(`Todos los campos son obligatorios`);
            return
        }
    }

    //Eiminar un producto por su id
    async deleteProductById (id){
        const existProduct = this.products.find(product=>product.id === id)
        if (existProduct) {
            const newProducts = this.products.filter(product => product.id != id)//Recupera todos los productos que no sean iguales al que queremos eliminar
            if (newProducts) {
                this.products = newProducts
                await this.guardarArchivo()
                console.log("Producto eliminado con exito");
            } else {
                console.log("Hubo un error al encontrar el producto");
            }
        } else {
            console.log(`El producto con id ${id} no existe`);
        }
    }

    //Obtener productos
    async getProducts (limit){
        const respuesta = await this.leerArchivo()
        if (!limit) {//Si no hay un limit muestra todos los productos
            return respuesta
            } else {
                const productsParse = JSON.parse(respuesta)
                const productsLimit = []
                for (let index = 0; index < limit; index++) {
                    productsLimit.push(productsParse[index])
                }
                return JSON.stringify(productsLimit, null, 2);
            }
        }

    //Obtener productos por su id
    async getProductsById (id) {
        const productsJSON = await this.getProducts()//Obtiene los productos
        const products = JSON.parse(productsJSON)
        const product = products.find(product => product.id === id)
        if (product) {
            return JSON.stringify(product,null,2)
        } else {
            console.log("Not found");
        }
    }

    //Editar un producto por su id
    async editedProductById (id, { title, description, price, img, code, stock }) {
        const productsJSON = await this.getProducts()//Obtiene los productos
        const products = JSON.parse(productsJSON)
        const productIndex = products.findIndex(product => product.id === id)// Busca el index del producto por su id
        if (productIndex !== -1) {// Si se encuentra el producto, actualizar sus propiedades
            //Actualiza la propiedad solo si se proporciona un nuevo valor, sino, mantiene el valor actual
            products[productIndex] =
            {
                ...products[productIndex],
                title: title ?? products[productIndex].title,
                description: description ?? products[productIndex].description,
                price: price ?? products[productIndex].price,
                img: img ?? products[productIndex].img,
                code: code ?? products[productIndex].code,
                stock: stock ?? products[productIndex].stock
            }
            this.products = products;
            await this.guardarArchivo()// Guardar el array de productos actualizado
            return products[productIndex]//Retorna el producto actualizado
        }else{
            console.log(`No hay un producto con id ${id}`);
            return
        }
    }
}

module.exports = ProductManager