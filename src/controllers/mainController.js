const Product = require('../models/Product');

const mainController = {
    home: (req, res) => {
        res.render('index', {
            title: 'ConstruMarket | Materiales de construcción y herramientas',
            products: Product.findAll().slice(0, 6)
        });
    }
};

module.exports = mainController;
