const Producto = require('../models/Producto');

const getProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll({
            order: [['createdAt', 'DESC']],
        });

        return res.status(200).json({
            success: true,
            message: 'Productos obtenidos correctamente',
            data: productos,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener los productos',
            error: error.message,
        });
    }
};

const getProductoById = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({
                success: false,
                message: `Producto con id ${id} no encontrado`,
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Producto obtenido correctamente',
            data: producto,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener el producto',
            error: error.message,
        });
    }
};

const createProducto = async (req, res) => {
    try {
        const { nombre, precio, estado } = req.body;

        const producto = await Producto.create({
            nombre,
            precio,
            estado,
        });

        return res.status(201).json({
            success: true,
            message: 'Producto creado correctamente',
            data: producto,
        });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errores = error.errors.map(e => e.message);
            return res.status(400).json({
                success: false,
                message: 'Error de validación',
                errors: errores,
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Error al crear el producto',
            error: error.message,
        });
    }
};

const updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio, estado } = req.body;

        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({
                success: false,
                message: `Producto con id ${id} no encontrado`,
            });
        }

        await producto.update({
            nombre: nombre ?? producto.nombre,
            precio: precio ?? producto.precio,
            estado: estado ?? producto.estado,
        });

        return res.status(200).json({
            success: true,
            message: 'Producto actualizado correctamente',
            data: producto,
        });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errores = error.errors.map(e => e.message);
            return res.status(400).json({
                success: false,
                message: 'Error de validación',
                errors: errores,
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Error al actualizar el producto',
            error: error.message,
        });
    }
};

const deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;

        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({
                success: false,
                message: `Producto con id ${id} no encontrado`,
            });
        }

        await producto.destroy();

        return res.status(200).json({
            success: true,
            message: 'Producto eliminado correctamente',
            data: producto,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar el producto',
            error: error.message,
        });
    }
};

module.exports = {
    getProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto,
};
