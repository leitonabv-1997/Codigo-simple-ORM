const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('laptop_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false,
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a MySQL establecida correctamente.');
    } catch (error) {
        console.error('❌ Error al conectar a MySQL:', error.message);
        process.exit(1);
    }
};

module.exports = { sequelize, testConnection };
