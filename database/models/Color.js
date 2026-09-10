module.exports = (sequelize, DataTypes) => {
    const Color = sequelize.define('Color', {
        id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING(50), allowNull: false, unique: true }
    }, { tableName: 'colors', timestamps: false });

    Color.associate = models => {
        Color.belongsToMany(models.Product, {
            through: models.ProductColor,
            as: 'products',
            foreignKey: 'colorId',
            otherKey: 'productId'
        });
    };

    return Color;
};
