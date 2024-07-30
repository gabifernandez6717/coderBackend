const express = require('express')
const router = express.Router()
const ProductModel = require('../../models/products.model.js')
const CartModel = require('../../models/carts.model.js')
class ProductManager{
    async getProducts (limit,page,query,value,sort){
        let filter ={}
        if (query){
            switch (query) {
                case 'stock':
                    filter = { stock: Number(value) }// http://localhost:8080/api/products?query=stock&value=20
                    break;
                case 'estado':
                    filter = { estado: Boolean(value) }// http://localhost:8080/api/products?query=estado&value=true
                    break;
                case 'category':
                    filter = { category: value }// http://localhost:8080/api/products?query=category&value=audio
                    break;
                case 'status':
                    filter = { status: Boolean(value) }// http://localhost:8080/api/products?query=price&value=true
                    break;
                default:
                    filter = {}
                    break;
            }
        }
        try {
            const products = await ProductModel.paginate(
                {...filter},
                {limit: limit? limit: 10,page: page? page: 1, sort:{price: sort? Number(sort):-1}}
            )//sort: sort? sort: 1
            const results = {
                ...products,
                prevLink: products.prevPage? `http://localhost:8080/products?page=${products.prevPage}`: null,
                nextLink: products.nextPage? `http://localhost:8080/products?page=${products.nextPage}`: null
            }
            console.log(results);
            return results
        } catch (error) {
            console.log(error);
        }
    }
    async getProductById (id){
        if (id) {
            try {
                const product = await ProductModel.paginate({_id: id},{})
                if (product) {
                    console.log(product);
                    return product
                } else {
                    return false
                }
            } catch (error) {
                console.log(error);
                return "error interno del servidor."
            }
        } else {
            return"Debe proporcionar un id."
        }
    }
    async addProduct (data){
        const send = data
        try {
            if (send) {
                const sendProduct = new ProductModel(send)
                await sendProduct.save()
                return sendProduct
            } else {
                console.log("No se proporcionó información.")
            }
        } catch (error) {
            console.log(error);
        }
    }
    async editedProduct (id, data){
        if (id && data) {
            try {
                const product = await ProductModel.findByIdAndUpdate(id, data)
                if (product) {
                    console.log(product);
                    return product
                } else {
                    return"No se proporcionó un id valido."
                }
            } catch (error) {
                res.status(500).send("error interno del servidor.")
                console.log(error);
            }
        } else {
            res.status(404).send("No se proporcionó un id.")
        }
    }
    async deleteProduct (id){
        if (id) {
            try {
                const product = await ProductModel.findByIdAndDelete(id)
                if (product) {
                    return product
                } else {
                    return"No se proporcionó un id valido."
                }
            } catch (error) {
                console.log(error);
                return"error interno del servidor."
            }
        } else {
            return"No se proporcionó un id."
        }
    }
}
module.exports = ProductManager