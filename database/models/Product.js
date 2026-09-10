module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING(150), allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: false, defaultValue: '' },
        image: { type: DataTypes.STRING(255), allowNull: false, defaultValue: 'construmarket-logo.png' },
        price: { type: DataTypes.DECIMAL(12, 2), allowNull: false, validate: { min: 0 } },
        stock: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
        categoryId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, field: 'category_id' },
        brandId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, field: 'brand_id' }
    }, { tableName: 'products' });

    Product.associate = models => {
        Product.belongsTo(models.Category, { as: 'categoryData', foreignKey: 'categoryId' });
        Product.belongsTo(models.Brand, { as: 'brandData', foreignKey: 'brandId' });
        Product.belongsToMany(models.Color, {
            through: models.ProductColor,
            as: 'colorData',
            foreignKey: 'productId',
            otherKey: 'colorId'
        });
    };

    return Product;
};
