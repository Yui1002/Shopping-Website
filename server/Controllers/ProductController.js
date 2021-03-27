'use strict'

import ProductManager from '../Managers/ProductManager.js'

class ProductController {
    constructor() {
        this.Manager = new ProductManager()
    }

    async getAllProducts() {
        let response = await this.Manager.getAllProducts()
        return response
    }

    async getSelectedProduct(parameter) {
        let response = await this.Manager.getSelectedProduct(parameter)
        return response
    }

    async addToCart(parameter) {
        let response = await this.Manager.addToCart(parameter)
        return response
    }

    async getCartItems() {
        let response = await this.Manager.getCartItems()
        return response
    }

    async removeItemsFromCart(items) {
        let response = await this.Manager.removeItemsFromCart(items)
        return response
    }

}

export default ProductController