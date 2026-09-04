const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

const Product = {
    findAll() {
        return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    },

    findById(id) {
        return this.findAll().find(product => product.id === Number(id));
    },

    generateId() {
        const products = this.findAll();
        const lastId = products.reduce((highestId, product) => {
            return product.id > highestId ? product.id : highestId;
        }, 0);

        return lastId + 1;
    },

    writeAll(products) {
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    },

    create(productData) {
        const products = this.findAll();
        const newProduct = {
            id: this.generateId(),
            ...productData
        };

        products.push(newProduct);
        this.writeAll(products);
        return newProduct;
    },

    update(id, productData) {
        const productId = Number(id);
        const products = this.findAll();
        const productIndex = products.findIndex(product => product.id === productId);

        if (productIndex === -1) {
            return null;
        }

        products[productIndex] = {
            ...products[productIndex],
            ...productData,
            id: productId
        };

        this.writeAll(products);
        return products[productIndex];
    },

    delete(id) {
        const productId = Number(id);
        const products = this.findAll();
        const filteredProducts = products.filter(product => product.id !== productId);

        if (filteredProducts.length === products.length) {
            return false;
        }

        this.writeAll(filteredProducts);
        return true;
    }
};

module.exports = Product;
