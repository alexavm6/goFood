const {Schema, model, SchemaTypes} = require('mongoose');


const DuracionSchema = new Schema({
    A_id: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "Alimento"
    },
    D_duracion: {
        type: Number,
        required: true
    },
    E_id:  {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "Estacion"
    }
},
{
    timestamps: true
});





module.exports = model('Duracion', DuracionSchema, 'duraciones');

