const { sequelize, testConnection } = require('./config/database');
const Producto = require('./models/Producto');

const seedData = async () => {
    try {
        await testConnection();
        await sequelize.sync();

        const laptops = [
            { nombre: 'Lenovo ThinkPad X1 Carbon', precio: 1299.99, estado: 'disponible' },
            { nombre: 'MacBook Pro 14 M3', precio: 1999.00, estado: 'disponible' },
            { nombre: 'Dell XPS 15', precio: 1549.99, estado: 'vendido' },
            { nombre: 'HP Spectre x360', precio: 1399.00, estado: 'reservado' },
            { nombre: 'ASUS ROG Zephyrus G14', precio: 1799.99, estado: 'disponible' },
        ];

        const created = await Producto.bulkCreate(laptops);
        console.log(`✅ ${created.length} laptops insertadas correctamente.`);

        const all = await Producto.findAll();
        console.log('\n📋 Productos en la base de datos:');
        all.forEach(p => {
            console.log(`  - [${p.id}] ${p.nombre} | $${p.precio} | ${p.estado}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

seedData();
