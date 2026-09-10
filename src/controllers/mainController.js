const { Product, Category, Brand, Color } = require('../../database/models');

const mainController = {
    home: async (req, res) => {
        const rows = await Product.findAll({
            include: [
                { model: Category, as: 'categoryData' },
                { model: Brand, as: 'brandData' },
                { model: Color, as: 'colorData', through: { attributes: [] } }
            ],
            order: [['createdAt', 'DESC']],
            limit: 6
        });
        res.render('index', {
            title: 'ConstruMarket | Materiales de construcción y herramientas',
            products: rows.map(row => {
                const product = row.get({ plain: true });
                return {
                    ...product,
                    price: Number(product.price),
                    category: product.categoryData.name,
                    brand: product.brandData.name,
                    colors: product.colorData.map(color => color.name)
                };
            })
        });
    }
};

module.exports = mainController;
