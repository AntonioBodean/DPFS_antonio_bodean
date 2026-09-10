module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define('UserRole', {
        id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING(30), allowNull: false, unique: true }
    }, { tableName: 'user_roles', timestamps: false });

    UserRole.associate = models => {
        UserRole.hasMany(models.User, { as: 'users', foreignKey: 'roleId' });
    };

    return UserRole;
};
