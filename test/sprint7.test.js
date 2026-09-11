const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

test('Express Validator protege registro, login y formularios de productos', () => {
    const packageJson = require('../package.json');
    const userRoutes = read('src/routes/userRoutes.js');
    const productRoutes = read('src/routes/productRoutes.js');

    assert.ok(packageJson.dependencies['express-validator']);
    assert.match(userRoutes, /loginValidations, userController\.processLogin/);
    assert.match(userRoutes, /registrationValidations, userController\.processRegister/);
    assert.match(productRoutes, /productCreateValidations, productController\.store/);
    assert.match(productRoutes, /productUpdateValidations, productController\.update/);
});

test('las reglas del servidor cubren los criterios obligatorios del sprint', () => {
    const users = read('src/middlewares/validations/userValidations.js');
    const products = read('src/middlewares/validations/productValidations.js');

    assert.match(users, /isLength\(\{ min: 2 \}\)/);
    assert.match(users, /isEmail\(\)/);
    assert.match(users, /User\.findOne/);
    assert.match(users, /value\.length >= 8/);
    assert.match(users, /bcrypt\.compareSync/);
    assert.match(users, /'\.jpg', '\.jpeg', '\.png', '\.gif'/);
    assert.match(products, /isLength\(\{ min: 5 \}\)/);
    assert.match(products, /isLength\(\{ min: 20 \}\)/);
    assert.match(products, /Category\.findByPk/);
});

test('los formularios tienen validación inmediata y feedback por campo', () => {
    const script = read('public/js/form-validation.js');
    for (const view of [
        'src/views/users/register.ejs',
        'src/views/users/login.ejs',
        'src/views/products/create.ejs',
        'src/views/products/edit.ejs'
    ]) {
        const source = read(view);
        assert.match(source, /data-validation=/);
        assert.match(source, /\/js\/form-validation\.js/);
    }
    assert.match(script, /addEventListener\('submit'/);
    assert.match(script, /addEventListener\(eventName/);
    assert.match(script, /allowedImageExtensions/);
});

test('solo el rol Admin puede administrar productos', () => {
    const adminMiddleware = require('../src/middlewares/adminMiddleware');
    const routes = read('src/routes/productRoutes.js');
    const list = read('src/views/products/list.ejs');
    const detail = read('src/views/products/detail.ejs');

    for (const route of [
        /get\('\/create', adminMiddleware/,
        /post\('\/', adminMiddleware/,
        /get\('\/:id\/edit', adminMiddleware/,
        /put\('\/:id', adminMiddleware/,
        /delete\('\/:id', adminMiddleware/
    ]) assert.match(routes, route);

    assert.match(list, /loggedUser\?\.category === 'Admin'/);
    assert.match(detail, /loggedUser\?\.category === 'Admin'/);

    let nextCalled = false;
    adminMiddleware(
        { session: { userId: 2 } },
        { locals: { loggedUser: { category: 'Admin' } } },
        () => { nextCalled = true; }
    );
    assert.equal(nextCalled, true);

    let responseStatus;
    let renderedView;
    adminMiddleware(
        { session: { userId: 1 } },
        {
            locals: { loggedUser: { category: 'Customer' } },
            status(status) { responseStatus = status; return this; },
            render(view) { renderedView = view; }
        },
        () => assert.fail('Un cliente no debe superar el middleware')
    );
    assert.equal(responseStatus, 403);
    assert.equal(renderedView, 'errors/403');
});

test('solo el rol Admin puede acceder a la administración de usuarios', () => {
    const routes = read('src/routes/userRoutes.js');
    const header = read('src/views/partials/header.ejs');

    for (const route of [
        /get\('\/create', adminMiddleware/,
        /post\('\/', adminMiddleware/,
        /get\('\/', adminMiddleware/,
        /get\('\/:id\/edit', adminMiddleware/,
        /get\('\/:id', adminMiddleware/,
        /put\('\/:id', adminMiddleware/,
        /delete\('\/:id', adminMiddleware/
    ]) assert.match(routes, route);

    assert.match(header, /loggedUser\.category === 'Admin'/);
});
