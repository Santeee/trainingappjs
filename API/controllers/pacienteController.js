const Paciente = require('../models/Paciente');

/**
 * Carga los datos de un nuevo cliente
 */
const nuevoCliente = async (req, res, next) => {

    const paciente = new Paciente(req.body);

    try {
        await paciente.save();

        res.json({
            mensaje: 'El cliente se agregó correctamente.'
        });

    } catch (error) {
        console.log('Todo mal');
        console.log(error);
        next();
    }
}

/**
 * Función creada para testaer express
 */
const bienvenida = (req, res, next) => {
    let numero = 0;
    numero = numero + 2;

    res.json({
        mensaje: 'Estams probando esta nueva tecnologia'+ numero
    });
}

/**
 * Devuelve el listado total de pacientes
 */
const obtenerPacientes = async (req, res, next) => {
    try {
        const pacientes = await Paciente.find({});
        res.json(pacientes);
    } catch (error) {
        console.log(error);
        next();
    }
}

/**
 *  Devuelve los datos de un paciente especifico, obteniendo como parámetro un id
 */
const obtenerPaciente  = async (req, res, next) => {
    try {
        const paciente = await Paciente.findById( req.params.id );
        res.json(paciente);
    } catch (error) {
        console.log(error);
        next();
    }
}

/**
 * Actualiza los datos de un paciente
 */
const actualizarPaciente  = async (req, res, next) => {
    try {
        const paciente = await Paciente.findOneAndUpdate( {_id: req.params.id}, req.body, {
            new: true
        });

        res.json(paciente);
    } catch (error) {
        console.log(error);
        next();
    }
}

/**
 * Borra los datos de un paciente
 */
const eliminarPaciente = async (req, res, next) => {
    try {
        await Paciente.findOneAndDelete({_id: req.params.id});

        res.json("El paciente fue eliminado");
    } catch (error) {
        console.log(error);
        next();
    }
}

module.exports = {
    nuevoCliente,
    bienvenida,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}