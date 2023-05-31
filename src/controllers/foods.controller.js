const AlimentoDeUsuario = require('../models/AlimentoDeUsuario');
const Alimento = require('../models/Alimento');
const Categoria = require('../models/Categoria');
const Unidad = require('../models/Unidad');
const Marca = require('../models/Marca');
const Tienda = require('../models/Tienda');

const foodsCtrl = {};

foodsCtrl.renderNewFood = async (req, res) => {
    try{
        const alimentos = await Alimento.find();
        const categorias = await Categoria.find();
        const unidades = await Unidad.find();
        const marcas = await Marca.find();
        const tiendas = await Tienda.find();
        //console.log(alimentos);
        res.render('foods/newfood', {alimentos, categorias, unidades, marcas, tiendas});
    }catch(e){
        console.log(e.message);
    }
};

foodsCtrl.newFood = async (req, res) => {
    
    
    try{
        console.log(req.body);
        const {alimento, categoria, diaIngreso, mesIngreso, anoIngreso, diaCaducidad, mesCaducidad, anoCaducidad, cantidad, unidad, marca, tienda} = req.body;
        const alimentoEncontrado = await Alimento.findOne({A_nombre: alimento});
        const A_id = alimentoEncontrado._id;
        const categoriaEncontrado = await Categoria.findOne({C_nombre: categoria});
        const C_id = categoriaEncontrado._id;
        const AU_fecha_ingreso = `${mesIngreso} ${diaIngreso}, ${anoIngreso}`;
        const AU_fecha_caducidad = `${mesCaducidad} ${diaCaducidad}, ${anoCaducidad}`;
        const U_id = req.user._id;
        const AU_cantidad = parseInt(cantidad);
        const unidadEncontrado = await Unidad.findOne({UN_unidad: unidad});
        const UN_id = unidadEncontrado._id;
        const marcaEncontrado = await Marca.findOne({M_nombre: marca});
        const M_id = marcaEncontrado._id;
        const tiendaEncontrado = await Tienda.findOne({T_nombre: tienda});
        const T_id = tiendaEncontrado._id;

        console.log(A_id, C_id, AU_fecha_ingreso, AU_fecha_caducidad, U_id, AU_cantidad, UN_id, M_id, T_id);


        

        //si ingreso no esta vacio
        if(diaIngreso || mesIngreso || anoIngreso){
            if(diaCaducidad || mesCaducidad || anoCaducidad){
                const nuevoAlimentoDeUsuario = new AlimentoDeUsuario({
                    A_id: A_id,
                    C_id: C_id,
                    AU_fecha_ingreso: new Date(`${mesIngreso} ${diaIngreso}, ${anoIngreso}`),
                    AU_fecha_caducidad: new Date(`${mesCaducidad} ${diaCaducidad}, ${anoCaducidad}`),
                    U_id: U_id,
                    AU_cantidad: AU_cantidad,
                    UN_id: UN_id,
                    M_id: M_id,
                    T_id: T_id
                });
                await nuevoAlimentoDeUsuario.save();
                console.log("Si ingreso, si caducidad: ", nuevoAlimentoDeUsuario);
            }else{
                const nuevoAlimentoDeUsuario = new AlimentoDeUsuario({
                    A_id: A_id,
                    C_id: C_id,
                    AU_fecha_ingreso: new Date(`${mesIngreso} ${diaIngreso}, ${anoIngreso}`),
                    U_id: U_id,
                    AU_cantidad: AU_cantidad,
                    UN_id: UN_id,
                    M_id: M_id,
                    T_id: T_id
                });
                await nuevoAlimentoDeUsuario.save();
                console.log("Si ingreso, no caducidad: ", nuevoAlimentoDeUsuario);
            }
        }else{
            if(diaCaducidad || mesCaducidad || anoCaducidad){
                const nuevoAlimentoDeUsuario = new AlimentoDeUsuario({
                    A_id: A_id,
                    C_id: C_id,
                    AU_fecha_caducidad: new Date(`${mesCaducidad} ${diaCaducidad}, ${anoCaducidad}`),
                    U_id: U_id,
                    AU_cantidad: AU_cantidad,
                    UN_id: UN_id,
                    M_id: M_id,
                    T_id: T_id
                });
                await nuevoAlimentoDeUsuario.save();
                console.log("No ingreso, si caducidad: ", nuevoAlimentoDeUsuario);
            }else{
                const nuevoAlimentoDeUsuario = new AlimentoDeUsuario({
                    A_id: A_id,
                    C_id: C_id,
                    U_id: U_id,
                    AU_cantidad: AU_cantidad,
                    UN_id: UN_id,
                    M_id: M_id,
                    T_id: T_id
                });
                await nuevoAlimentoDeUsuario.save();
                console.log("No ingreso, no caducidad: ", nuevoAlimentoDeUsuario);
            }
        }
        
        res.redirect('/foods/newfood');
    }catch(e){
        console.log(e.message);
    }
    
};

foodsCtrl.renderUpdateFood = async (req, res) => {
    try{
        console.log(req.params.id);
        res.send('get renderUpdateFood');
    }catch(e){
        console.log(e.message);
    }
};

foodsCtrl.updateFood = async (req, res) => {
    try{
        
    }catch(e){
        console.log(e.message);
    }
};

foodsCtrl.deleteFood = async (req, res) => {
    try{
        await AlimentoDeUsuario.findByIdAndDelete(req.params.id);
        res.redirect('/dashboard/foods');
    }catch(e){
        console.log(e.message);
    }
};




module.exports = foodsCtrl;