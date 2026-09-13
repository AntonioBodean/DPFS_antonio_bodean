const { Product, Category, Brand, Color } = require('../../../database/models');
const { sendApiError, buildAbsoluteUrl, parsePositiveInteger } = require('../../utils/apiResponse');

const productApiController = {
    list: async (req, res) => {
        const [{ count, rows }, categories] = await Promise.all([
            Product.findAndCountAll({
                attributes: ['id', 'name', 'description'],
                include: [{
                    model: Category,
                    as: 'categoryData',
                    attributes: ['id', 'name']
                }],
                order: [['id', 'ASC']]
            }),
            Category.findAll({
                attributes: ['id', 'name'],
                include: [{
                    model: Product,
                    as: 'products',
                    attributes: ['id'],
                    required: false
                }],
                order: [['id', 'ASC']]
            })
        ]);

        return res.json({
            count,
            countByCategory: Object.fromEntries(
                categories.map(category => [category.name, category.products.length])
            ),
            products: rows.map(product => ({
                id: product.id,
                name: product.name,
                description: product.description,
                categories: product.categoryData ? [{
                    id: product.categoryData.id,
                    name: product.categoryData.name
                }] : [],
                detail: buildAbsoluteUrl(req, `/api/products/${product.id}`)
            }))
        });
    },
    detail: async (req, res) => {
        const id = parsePositiveInteger(req.params.id);
        if (!id) {
            return sendApiError(
                res,
                400,
                'INVALID_ID',
                'El identificador debe ser un número entero positivo.'
            );
        }

        const product = await Product.findByPk(id, {
            attributes: [
                'id',
                'name',
                'description',
                'price',
                'stock',
                'categoryId',
                'brandId',
                'image',
                'createdAt',
                'updatedAt'
            ],
            include: [
                {
                    model: Category,
                    as: 'categoryData',
                    attributes: ['id', 'name']
                },
                {
                    model: Brand,
                    as: 'brandData',
                    attributes: ['id', 'name']
                },
                {
                    model: Color,
                    as: 'colorData',
                    attributes: ['id', 'name'],
                    through: { attributes: [] }
                }
            ]
        });
        if (!product) {
            return sendApiError(
                res,
                404,
                'PRODUCT_NOT_FOUND',
                'El producto solicitado no existe.'
            );
        }

        return res.json({
            id: product.id,
            name: product.name,
            description: product.description,
            price: Number(product.price),
            stock: product.stock,
            categoryId: product.categoryId,
            brandId: product.brandId,
            image: buildAbsoluteUrl(req, `/images/${product.image}`),
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            categories: product.categoryData ? [{
                id: product.categoryData.id,
                name: product.categoryData.name
            }] : [],
            brands: product.brandData ? [{
                id: product.brandData.id,
                name: product.brandData.name
            }] : [],
            colors: product.colorData.map(color => ({
                id: color.id,
                name: color.name
            }))
        });
    }
};

module.exports = productApiController;
