const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const modelFactories = [
    require('./UserRole'),
    require('./User'),
    require('./Category'),
    require('./Brand'),
    require('./Color'),
    require('./Product'),
    require('./ProductColor')
];

const db = { sequelize, Sequelize };

for (const factory of modelFactories) {
    const model = factory(sequelize, DataTypes);
    db[model.name] = model;
}

for (const model of Object.values(db)) {
    if (model && typeof model.associate === 'function') model.associate(db);
}

module.exports = db;
