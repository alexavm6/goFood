const {Schema, model, SchemaTypes} = require('mongoose');


const ValoracionSchema = new Schema({
    U_id: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "User"
    },
    R_id:  {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "Receta"
    },
    V_valoracion:  {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});





module.exports = model('Valoracion', ValoracionSchema, 'valoraciones');

