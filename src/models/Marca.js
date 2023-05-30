const {Schema, model, SchemaTypes} = require('mongoose');


const MarcaSchema = new Schema({
    M_nombre: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});





module.exports = model('Marca', MarcaSchema, 'marcas');

