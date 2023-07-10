const {Schema, model, SchemaTypes} = require('mongoose');


const EstacionSchema = new Schema({
    E_nombre: {
        type: String,
        required: true
    },
    E_fecha_inicio: {
        type: Date,
        required: true
    },
    E_fecha_fin: {
        type: Date,
        required: true
    }
},
{
    timestamps: true
});





module.exports = model('Estacion', EstacionSchema, 'estaciones');

