module.exports = (sequelize, DataTypes) => sequelize.define('ProductColor', {
    productId: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, field: 'product_id' },
    colorId: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, field: 'color_id' }
}, { tableName: 'product_colors', timestamps: false });
