const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const app = require('../src/app');

const productsFilePath = path.join(__dirname, '../src/data/products.json');

test('el CRUD JSON del Sprint 4 (reemplazado por Sequelize en Sprint 6)', { skip: 'Prueba histórica: modifica archivos JSON que ya no son la fuente de datos.' }, async () => {
    const originalProducts = fs.readFileSync(productsFilePath, 'utf-8');
    const server = app.listen(0);
    const address = server.address();
    const baseUrl = `http://127.0.0.1:${address.port}`;

    const productData = {
        name: 'Producto de prueba',
        description: 'Creado automáticamente por la prueba del Sprint 4.',
        category: 'Materiales',
        colors: 'Gris, Blanco',
        price: '1500',
        brand: 'ConstruMarket',
        stock: '10'
    };

    try {
        const homeResponse = await fetch(baseUrl);
        const listResponse = await fetch(`${baseUrl}/products`);
        const detailResponse = await fetch(`${baseUrl}/products/1`);
        const createFormResponse = await fetch(`${baseUrl}/products/create`);
        const editFormResponse = await fetch(`${baseUrl}/products/1/edit`);
        const missingResponse = await fetch(`${baseUrl}/products/999999`);
        const missingHtml = await missingResponse.text();
        const unknownPageResponse = await fetch(`${baseUrl}/ruta-inexistente`);
        const unknownPageHtml = await unknownPageResponse.text();

        assert.equal(homeResponse.status, 200);
        assert.equal(listResponse.status, 200);
        assert.equal(detailResponse.status, 200);
        assert.equal(createFormResponse.status, 200);
        assert.equal(editFormResponse.status, 200);
        assert.equal(missingResponse.status, 404);
        assert.match(missingHtml, /Producto no encontrado/);
        assert.match(missingHtml, /\/css\/style\.css/);
        assert.equal(unknownPageResponse.status, 404);
        assert.match(unknownPageHtml, /Página no encontrada/);
        assert.match(unknownPageHtml, /\/css\/style\.css/);

        const createResponse = await fetch(`${baseUrl}/products`, {
            method: 'POST',
            body: new URLSearchParams(productData),
            redirect: 'manual'
        });
        assert.equal(createResponse.status, 302);

        const createdProduct = Product.findAll().find(product => product.name === productData.name);
        assert.ok(createdProduct);
        assert.deepEqual(createdProduct.colors, ['Gris', 'Blanco']);

        const updateResponse = await fetch(`${baseUrl}/products/${createdProduct.id}?_method=PUT`, {
            method: 'POST',
            body: new URLSearchParams({ ...productData, name: 'Producto editado' }),
            redirect: 'manual'
        });
        assert.equal(updateResponse.status, 302);
        assert.equal(Product.findById(createdProduct.id).name, 'Producto editado');

        const deleteResponse = await fetch(`${baseUrl}/products/${createdProduct.id}?_method=DELETE`, {
            method: 'POST',
            redirect: 'manual'
        });
        assert.equal(deleteResponse.status, 302);
        assert.equal(Product.findById(createdProduct.id), undefined);
    } finally {
        fs.writeFileSync(productsFilePath, originalProducts);
        await new Promise(resolve => server.close(resolve));
    }
});
