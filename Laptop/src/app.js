const express = require('express');
const { sequelize, testConnection } = require('./config/database');
const productoRoutes = require('./routes/productoRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', productoRoutes);

app.get('/', (req, res) => {
    res.json({
        message: '🖥️ API de Laptops - CRUD con Sequelize ORM',
        endpoints: {
            'GET /api/productos': 'Listar todos los productos',
            'GET /api/productos/:id': 'Obtener un producto por ID',
            'POST /api/productos': 'Crear un producto',
            'PUT /api/productos/:id': 'Actualizar un producto',
            'DELETE /api/productos/:id': 'Eliminar un producto',
        },
    });
});

const startServer = async () => {
    try {
        await testConnection();

        await sequelize.sync({ alter: true });
        console.log('✅ Tablas sincronizadas correctamente.');

        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
            console.log(`📋 Endpoints disponibles en http://localhost:${PORT}/api/productos`);
        });
    } catch (error) {
        console.error('❌ Error al iniciar el servidor:', error.message);
        process.exit(1);
    }
};

startServer();
