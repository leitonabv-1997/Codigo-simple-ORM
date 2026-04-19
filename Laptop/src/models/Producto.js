const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Producto = sequelize.define('Producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El nombre del producto es requerido',
            },
        },
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: {
                msg: 'El precio debe ser un número válido',
            },
            min: {
                args: [0],
                msg: 'El precio no puede ser negativo',
            },
        },
    },
    estado: {
        type: DataTypes.ENUM('disponible', 'vendido', 'reservado'),
        defaultValue: 'disponible',
        allowNull: false,
    },
}, {
    tableName: 'productos',
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
});

module.exports = Producto;
