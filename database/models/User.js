module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        firstName: { type: DataTypes.STRING(80), allowNull: false, field: 'first_name' },
        lastName: { type: DataTypes.STRING(80), allowNull: false, field: 'last_name' },
        email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
        phone: { type: DataTypes.STRING(30), allowNull: true },
        password: { type: DataTypes.STRING(100), allowNull: false },
        image: { type: DataTypes.STRING(255), allowNull: false, defaultValue: '/images/construmarket-logo.png' },
        roleId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, field: 'role_id' }
    }, { tableName: 'users' });

    User.associate = models => {
        User.belongsTo(models.UserRole, { as: 'role', foreignKey: 'roleId' });
    };

    return User;
};
