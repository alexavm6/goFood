const {Schema, model, SchemaTypes} = require('mongoose');


const AlimentoDeUsuarioSchema = new Schema({
    A_id: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "Alimento"
    },
    C_id:  {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "Categoria"
    },
    AU_fecha_ingreso: {
        type: Date,
        default: () => Date.now()
    },
    AU_fecha_caducidad: {
        type: Date,
        default: () => Date.now()
    },
    U_id:  {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "User"
    },
    AU_cantidad: {
        type: Number,
        required: true
    },
    UN_id: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "Unidad"
    },
    M_id:  {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "Marca"
    },
    T_id:  {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "Tienda"
    }
},
{
    timestamps: true
});





module.exports = model('AlimentoDeUsuario', AlimentoDeUsuarioSchema, 'alimentosDeUsuarios');

