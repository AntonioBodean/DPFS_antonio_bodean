const products = [
    {
        id: 1,
        name: 'Cemento Portland 25 kg',
        category: 'Materiales',
        price: 18900,
        image: 'cemento.jpg'
    },
    {
        id: 2,
        name: 'Ladrillo hueco 12 × 18 × 33 cm',
        category: 'Materiales',
        price: 1250,
        image: 'ladrillo.jpg'
    },
    {
        id: 3,
        name: 'Amoladora angular 850 W',
        category: 'Herramientas',
        price: 84990,
        image: 'amoladora.jpg'
    },
    {
        id: 4,
        name: 'Pintura látex interior 20 L',
        category: 'Pinturas',
        price: 68500,
        image: 'latex.jpg'
    },
    {
        id: 5,
        name: 'Taladro percutor 700 W',
        category: 'Herramientas',
        price: 96300,
        image: 'taladro.jpg'
    },
    {
        id: 6,
        name: 'Hierro redondo liso 10 mm',
        category: 'Hierros',
        price: 18750,
        image: 'hierro.jpg'
    }
];

const productController = {
    list: (req, res) => {
        res.render('products/list', {
            title: 'Productos | ConstruMarket',
            products: products
        });
    },

    create: (req, res) => {
        res.render('products/create', {
            title: 'Crear producto | ConstruMarket'
        });
    },

    edit: (req, res) => {
        const productId = Number(req.params.id);
        const product = products.find(p => p.id === productId);

        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }

        return res.render('products/edit', {
            title: 'Editar producto | ConstruMarket',
            product: product
        });
    },

    detail: (req, res) => {
        res.render('products/detail', {
            title: 'Cemento Portland 25 kg | ConstruMarket'
        });
    },

    cart: (req, res) => {
        res.render('products/cart', {
            title: 'Tu carrito | ConstruMarket'
        });
    }
};

module.exports = productController;