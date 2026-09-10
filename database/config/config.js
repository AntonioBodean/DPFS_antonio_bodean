require('dotenv').config({ quiet: true });

const common = {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || 'construmarket',
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    dialect: 'mysql',
    logging: process.env.DB_LOGGING === 'true' ? console.log : false,
    define: {
        underscored: true,
        freezeTableName: true
    }
};

module.exports = {
    development: common,
    test: { ...common, database: process.env.DB_TEST_NAME || `${common.database}_test` },
    production: {
        ...common,
        logging: false,
        dialectOptions: process.env.DB_SSL === 'true' ? { ssl: { require: true } } : undefined
    }
};
