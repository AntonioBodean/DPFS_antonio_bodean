module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING(80), allowNull: false, unique: true }
    }, { tableName: 'categories', timestamps: false });

    Category.associate = models => {
        Category.hasMany(models.Product, { as: 'products', foreignKey: 'categoryId' });
    };

    return Category;
};
