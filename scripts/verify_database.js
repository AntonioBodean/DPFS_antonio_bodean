const db = require('../database/models');
const fs = require('fs');
const path = require('path');

async function verifyDatabase() {
    try {
        await db.sequelize.authenticate();

        const [
            users,
            products,
            categories,
            brands,
            colors,
            productColors,
            latestUser,
            latestProduct,
            userImages,
            productImages
        ] = await Promise.all([
            db.User.count(),
            db.Product.count(),
            db.Category.count(),
            db.Brand.count(),
            db.Color.count(),
            db.ProductColor.count(),
            db.User.findOne({
                include: [{ model: db.UserRole, as: 'role' }],
                order: [['id', 'DESC']]
            }),
            db.Product.findOne({
                include: [
                    { model: db.Category, as: 'categoryData' },
                    { model: db.Brand, as: 'brandData' },
                    { model: db.Color, as: 'colorData' }
                ],
                order: [['id', 'DESC']]
            }),
            db.User.findAll({ attributes: ['id', 'image'], raw: true }),
            db.Product.findAll({ attributes: ['id', 'image'], raw: true })
        ]);

        const [integrityRows] = await db.sequelize.query(`
            SELECT
                (SELECT COUNT(*)
                    FROM users AS user
                    LEFT JOIN user_roles AS role ON role.id = user.role_id
                    WHERE role.id IS NULL) AS users_without_role,
                (SELECT COUNT(*)
                    FROM products AS product
                    LEFT JOIN categories AS category ON category.id = product.category_id
                    WHERE category.id IS NULL) AS products_without_category,
                (SELECT COUNT(*)
                    FROM products AS product
                    LEFT JOIN brands AS brand ON brand.id = product.brand_id
                    WHERE brand.id IS NULL) AS products_without_brand,
                (SELECT COUNT(*)
                    FROM product_colors AS product_color
                    LEFT JOIN products AS product ON product.id = product_color.product_id
                    LEFT JOIN colors AS color ON color.id = product_color.color_id
                    WHERE product.id IS NULL OR color.id IS NULL) AS invalid_product_colors
        `);

        const counts = { users, products, categories, brands, colors, productColors };
        const integrity = Object.fromEntries(
            Object.entries(integrityRows[0]).map(([key, value]) => [key, Number(value)])
        );
        const emptyTables = Object.entries(counts)
            .filter(([, count]) => count === 0)
            .map(([table]) => table);
        const integrityErrors = Object.entries(integrity)
            .filter(([, count]) => count !== 0)
            .map(([check, count]) => `${check}: ${count}`);

        if (!latestUser?.role) integrityErrors.push('latest_user_without_loaded_role');
        if (!latestProduct?.categoryData) integrityErrors.push('latest_product_without_loaded_category');
        if (!latestProduct?.brandData) integrityErrors.push('latest_product_without_loaded_brand');

        const publicDirectory = path.join(__dirname, '..', 'public');
        const missingImages = [
            ...userImages.map(user => ({
                resource: `user:${user.id}`,
                image: user.image,
                file: path.join(publicDirectory, user.image.replace(/^[/\\]+/, ''))
            })),
            ...productImages.map(product => ({
                resource: `product:${product.id}`,
                image: `/images/${product.image}`,
                file: path.join(publicDirectory, 'images', product.image)
            }))
        ]
            .filter(item => !fs.existsSync(item.file))
            .map(({ resource, image }) => ({ resource, image }));

        const result = {
            connected: true,
            counts,
            sampleAssociations: {
                user: latestUser && {
                    id: latestUser.id,
                    role: latestUser.role?.name ?? null
                },
                product: latestProduct && {
                    id: latestProduct.id,
                    category: latestProduct.categoryData?.name ?? null,
                    brand: latestProduct.brandData?.name ?? null,
                    colors: latestProduct.colorData?.map(color => color.name) ?? []
                }
            },
            integrity,
            missingImages
        };

        console.log(JSON.stringify(result, null, 2));

        if (emptyTables.length > 0) {
            throw new Error(`Faltan datos de prueba en: ${emptyTables.join(', ')}`);
        }
        if (integrityErrors.length > 0) {
            throw new Error(`Fallaron controles de integridad: ${integrityErrors.join(', ')}`);
        }
        if (missingImages.length > 0) {
            throw new Error(`Hay ${missingImages.length} imágenes referenciadas que no existen`);
        }

        console.log('Verificación de base de datos completada correctamente.');
    } finally {
        await db.sequelize.close();
    }
}

verifyDatabase().catch(error => {
    console.error(`Error de verificación: ${error.message}`);
    process.exitCode = 1;
});
