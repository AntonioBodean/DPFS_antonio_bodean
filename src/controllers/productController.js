const Product = require('../models/Product');

function renderProductNotFound(res) {
    return res.status(404).render('errors/404', {
        title: 'Producto no encontrado | ConstruMarket',
        heading: 'Producto no encontrado',
        message: 'El producto que buscás no existe o fue eliminado.',
        backUrl: '/products',
        backLabel: 'Volver a productos'
    });
}

function normalizeColors(colors = '') {
    return colors
        .split(',')
        .map(color => color.trim())
        .filter(Boolean);
}

function buildProductData(body, image) {
    return {
        name: body.name.trim(),
        description: body.description.trim(),
        image,
        category: body.category,
        colors: normalizeColors(body.colors),
        price: Number(body.price),
        brand: body.brand.trim(),
        stock: Number(body.stock)
    };
}

const productController = {
    list: (req, res) => {
        res.render('products/list', {
            title: 'Productos | ConstruMarket',
            products: Product.findAll()
        });
    },

    create: (req, res) => {
        res.render('products/create', {
            title: 'Crear producto | ConstruMarket'
        });
    },

    store: (req, res) => {
        const image = req.file ? req.file.filename : 'construmarket-logo.png';
        Product.create(buildProductData(req.body, image));

        return res.redirect('/products');
    },

    detail: (req, res) => {
        const product = Product.findById(req.params.id);

        if (!product) {
            return renderProductNotFound(res);
        }

        const relatedProducts = Product.findAll()
            .filter(item => item.id !== product.id && item.category === product.category)
            .slice(0, 4);

        return res.render('products/detail', {
            title: `${product.name} | ConstruMarket`,
            product,
            relatedProducts
        });
    },

    edit: (req, res) => {
        const product = Product.findById(req.params.id);

        if (!product) {
            return renderProductNotFound(res);
        }

        return res.render('products/edit', {
            title: 'Editar producto | ConstruMarket',
            product
        });
    },

    update: (req, res) => {
        const currentProduct = Product.findById(req.params.id);

        if (!currentProduct) {
            return renderProductNotFound(res);
        }

        const image = req.file ? req.file.filename : currentProduct.image;
        Product.update(req.params.id, buildProductData(req.body, image));

        return res.redirect(`/products/${req.params.id}`);
    },

    destroy: (req, res) => {
        const wasDeleted = Product.delete(req.params.id);

        if (!wasDeleted) {
            return renderProductNotFound(res);
        }

        return res.redirect('/products');
    },

    cart: (req, res) => {
        res.render('products/cart', {
            title: 'Tu carrito | ConstruMarket'
        });
    }
};

module.exports = productController;
