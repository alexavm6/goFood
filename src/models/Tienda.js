const {Schema, model, SchemaTypes} = require('mongoose');


const TiendaSchema = new Schema({
    T_nombre: {
        type: String,
        required: true
    }
});





module.exports = model('Tienda', TiendaSchema, 'tiendas');

