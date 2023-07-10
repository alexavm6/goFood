const {Schema, model, SchemaTypes} = require('mongoose');


const AlimentoSchema = new Schema({
    A_nombre: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});





module.exports = model('Alimento', AlimentoSchema, 'alimentos');

