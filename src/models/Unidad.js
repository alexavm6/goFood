const {Schema, model, SchemaTypes} = require('mongoose');


const UnidadSchema = new Schema({
    UN_unidad: {
        type: String,
        required: true
    },
    UN_nombre: {
        type: String,
        required: true
    }
});





module.exports = model('Unidad', UnidadSchema, 'unidades');

