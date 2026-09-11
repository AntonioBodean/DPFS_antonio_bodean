const { Op } = require('sequelize');
const fs = require('fs');
const { validationResult } = require('express-validator');
const { sequelize, Product, Category, Brand, Color } = require('../../database/models');

const productIncludes = [
    { model: Category, as: 'categoryData', attributes: ['id', 'name'] },
    { model: Brand, as: 'brandData', attributes: ['id', 'name'] },
    { model: Color, as: 'colorData', attributes: ['id', 'name'], through: { attributes: [] } }
];

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
    return colors.split(',').map(color => color.trim()).filter(Boolean);
}

function presentProduct(instance) {
    const product = instance.get({ plain: true });
    return {
        ...product,
        price: Number(product.price),
        category: product.categoryData?.name || '',
        brand: product.brandData?.name || '',
        colors: (product.colorData || []).map(color => color.name)
    };
}

async function findProduct(id) {
    return Product.findByPk(id, { include: productIncludes });
}

async function formData() {
    return { categories: await Category.findAll({ order: [['name', 'ASC']] }) };
}

function getErrors(req) {
    const mapped = validationResult(req).mapped();
    return Object.fromEntries(Object.entries(mapped).map(([field, error]) => [field, error.msg]));
}

function removeUploadedFile(file) {
    if (file && fs.existsSync(file.path)) fs.unlinkSync(file.path);
}

async function saveColors(product, colorNames, transaction) {
    const colors = [];
    for (const name of colorNames) {
        const [color] = await Color.findOrCreate({ where: { name }, transaction });
        colors.push(color);
    }
    await product.setColorData(colors, { transaction });
}

const productController = {
    list: async (req, res) => {
        const q = (req.query.q || '').trim();
        const where = q ? {
            [Op.or]: [
                { name: { [Op.like]: `%${q}%` } },
                { description: { [Op.like]: `%${q}%` } },
                { '$categoryData.name$': { [Op.like]: `%${q}%` } },
                { '$brandData.name$': { [Op.like]: `%${q}%` } }
            ]
        } : {};
        const rows = await Product.findAll({ where, include: productIncludes, order: [['name', 'ASC']] });
        res.render('products/list', {
            title: 'Productos | ConstruMarket',
            products: rows.map(presentProduct),
            q
        });
    },

    create: async (req, res) => res.render('products/create', {
        title: 'Crear producto | ConstruMarket',
        errors: {},
        oldData: {},
        ...(await formData())
    }),

    store: async (req, res) => {
        const errors = getErrors(req);
        if (Object.keys(errors).length) {
            removeUploadedFile(req.file);
            return res.status(422).render('products/create', {
                title: 'Crear producto | ConstruMarket',
                errors,
                oldData: req.body,
                ...(await formData())
            });
        }
        const transaction = await sequelize.transaction();
        try {
            const [brand] = await Brand.findOrCreate({ where: { name: req.body.brand.trim() }, transaction });
            const product = await Product.create({
                name: req.body.name.trim(),
                description: (req.body.description || '').trim(),
                image: req.file ? req.file.filename : 'construmarket-logo.png',
                price: Number(req.body.price),
                stock: Number(req.body.stock),
                categoryId: Number(req.body.categoryId),
                brandId: brand.id
            }, { transaction });
            await saveColors(product, normalizeColors(req.body.colors), transaction);
            await transaction.commit();
            return res.redirect('/products');
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    },

    detail: async (req, res) => {
        const row = await findProduct(req.params.id);
        if (!row) return renderProductNotFound(res);
        const product = presentProduct(row);
        const relatedRows = await Product.findAll({
            where: { id: { [Op.ne]: product.id }, categoryId: product.categoryId },
            include: productIncludes,
            limit: 4
        });
        return res.render('products/detail', {
            title: `${product.name} | ConstruMarket`,
            product,
            relatedProducts: relatedRows.map(presentProduct)
        });
    },

    edit: async (req, res) => {
        const row = await findProduct(req.params.id);
        if (!row) return renderProductNotFound(res);
        return res.render('products/edit', {
            title: 'Editar producto | ConstruMarket',
            product: presentProduct(row),
            errors: {},
            ...(await formData())
        });
    },

    update: async (req, res) => {
        const row = await findProduct(req.params.id);
        if (!row) return renderProductNotFound(res);
        const currentProduct = presentProduct(row);
        const errors = getErrors(req);
        if (Object.keys(errors).length) {
            removeUploadedFile(req.file);
            return res.status(422).render('products/edit', {
                title: 'Editar producto | ConstruMarket',
                errors,
                product: {
                    ...currentProduct,
                    ...req.body,
                    categoryId: Number(req.body.categoryId),
                    colors: normalizeColors(req.body.colors)
                },
                ...(await formData())
            });
        }
        const product = row;
        const transaction = await sequelize.transaction();
        try {
            const [brand] = await Brand.findOrCreate({ where: { name: req.body.brand.trim() }, transaction });
            await product.update({
                name: req.body.name.trim(),
                description: (req.body.description || '').trim(),
                image: req.file ? req.file.filename : product.image,
                price: Number(req.body.price),
                stock: Number(req.body.stock),
                categoryId: Number(req.body.categoryId),
                brandId: brand.id
            }, { transaction });
            await saveColors(product, normalizeColors(req.body.colors), transaction);
            await transaction.commit();
            return res.redirect(`/products/${product.id}`);
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    },

    destroy: async (req, res) => {
        const deleted = await Product.destroy({ where: { id: req.params.id } });
        if (!deleted) return renderProductNotFound(res);
        return res.redirect('/products');
    },

    cart: (req, res) => res.render('products/cart', { title: 'Tu carrito | ConstruMarket' })
};

module.exports = productController;
