const {Schema, model, SchemaTypes} = require('mongoose');


const CategoriaSchema = new Schema({
    C_nombre: {
        type: String,
        required: true
    }
});





module.exports = model('Categoria', CategoriaSchema, 'categorias');

