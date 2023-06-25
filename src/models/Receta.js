const {Schema, model, SchemaTypes} = require('mongoose');


const RecetaSchema = new Schema({
    R_nombre: {
        type: String,
        required: true
    },
    R_descripcion:  {
        type: String,
        required: true
    },
    R_ingredientes: []
});





module.exports = model('Receta', RecetaSchema, 'recetas');

