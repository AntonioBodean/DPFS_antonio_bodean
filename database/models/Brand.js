module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define('Brand', {
        id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING(80), allowNull: false, unique: true }
    }, { tableName: 'brands', timestamps: false });

    Brand.associate = models => {
        Brand.hasMany(models.Product, { as: 'products', foreignKey: 'brandId' });
    };

    return Brand;
};
