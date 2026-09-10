const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const db = require('../database/models');

test('los modelos Sequelize representan todas las tablas y relaciones', async () => {
    assert.deepEqual(
        ['Brand', 'Category', 'Color', 'Product', 'ProductColor', 'User', 'UserRole'],
        Object.keys(db).filter(name => !['sequelize', 'Sequelize'].includes(name)).sort()
    );
    assert.ok(db.User.associations.role);
    assert.ok(db.UserRole.associations.users);
    assert.ok(db.Product.associations.categoryData);
    assert.ok(db.Product.associations.brandData);
    assert.ok(db.Product.associations.colorData);
    assert.ok(db.Color.associations.products);
    await db.sequelize.close();
});

test('los scripts SQL crean y pueblan la base normalizada', () => {
    const structure = fs.readFileSync(path.join(root, 'database/structure.sql'), 'utf8');
    const data = fs.readFileSync(path.join(root, 'database/data.sql'), 'utf8');
    for (const table of ['user_roles', 'users', 'categories', 'brands', 'colors', 'products', 'product_colors']) {
        assert.match(structure, new RegExp(`CREATE TABLE ${table}`));
    }
    assert.match(structure, /CREATE DATABASE construmarket/);
    assert.match(structure, /FOREIGN KEY \(category_id\)/);
    assert.match(structure, /FOREIGN KEY \(brand_id\)/);
    assert.match(data, /INSERT INTO users/);
    assert.match(data, /INSERT INTO products/);
});

test('la aplicación usa Sequelize y entrega el DER', () => {
    const runtimeFiles = [
        'src/controllers/mainController.js',
        'src/controllers/productController.js',
        'src/controllers/userController.js',
        'src/middlewares/rememberUserMiddleware.js'
    ];
    for (const file of runtimeFiles) {
        const source = fs.readFileSync(path.join(root, file), 'utf8');
        assert.doesNotMatch(source, /data\/(products|users)\.json/);
        assert.doesNotMatch(source, /readFileSync\(/);
    }
    assert.ok(fs.statSync(path.join(root, 'drawio/pdf/construmarket-der.pdf')).size > 1000);
});

test('el alta administrativa de usuarios no reutiliza el registro de visitantes', () => {
    const routes = fs.readFileSync(path.join(root, 'src/routes/userRoutes.js'), 'utf8');
    const controller = fs.readFileSync(path.join(root, 'src/controllers/userController.js'), 'utf8');
    const listView = fs.readFileSync(path.join(root, 'src/views/users/list.ejs'), 'utf8');
    const registerView = fs.readFileSync(path.join(root, 'src/views/users/register.ejs'), 'utf8');

    assert.match(routes, /router\.get\('\/create', authMiddleware, userController\.create\)/);
    assert.match(routes, /router\.post\('\/', authMiddleware, upload\.single\('image'\), userController\.store\)/);
    assert.match(listView, /href="\/users\/create"/);
    assert.match(registerView, /isAdminCreate \? '\/users' : '\/users\/register'/);

    const storeHandler = controller.slice(controller.indexOf('store: async'), controller.indexOf('list: async'));
    assert.doesNotMatch(storeHandler, /req\.session\.userId\s*=/);
});
