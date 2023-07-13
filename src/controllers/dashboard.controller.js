const AlimentoDeUsuario = require('../models/AlimentoDeUsuario');
const Alimento = require('../models/Alimento');
const Categoria = require('../models/Categoria');
const Unidad = require('../models/Unidad');
const Marca = require('../models/Marca');
const Tienda = require('../models/Tienda');
const Receta = require('../models/Receta');

const dashboardCtrl = {};

dashboardCtrl.renderDashboard = async (req, res) => {

    const {_id} = req.user;

    try{
        const cantidadDeAlimentosIngresados = await AlimentoDeUsuario.countDocuments({U_id: _id});
        const ultimoAlimento = await AlimentoDeUsuario.find({U_id: _id}).sort({AU_fecha_ingreso: 'desc'}).limit(1);
        const fechaUltimoAlimentoIngresado = ultimoAlimento[0].AU_fecha_ingreso;
        const alimentosMasCercanosACaducar = await AlimentoDeUsuario.find({U_id: _id}).sort({AU_fecha_caducidad: 'asc'}).limit(3).populate({ path: 'A_id', model: Alimento}).populate({ path: 'C_id', model: Categoria}).populate({ path: 'UN_id', model: Unidad}).populate({ path: 'M_id', model: Marca}).populate({ path: 'T_id', model: Tienda});
        //console.log(alimentosMasCercanosACaducar);
        res.render('dashboard/dashboard', {cantidadDeAlimentosIngresados, fechaUltimoAlimentoIngresado, alimentosMasCercanosACaducar});
    }catch(e){
        console.log(e.message);
        //req.flash('error_msg', 'Error al calcular cantidad de alimentos ingresados');
        //res.render('dashboard/dashboard');
    }


};

dashboardCtrl.renderFoods = async (req, res) => {

    const {_id} = req.user;

    try{
        const alimentosIngresados = await AlimentoDeUsuario.find({U_id: _id}).sort({createdAt: 'desc'}).populate({ path: 'A_id', model: Alimento}).populate({ path: 'C_id', model: Categoria}).populate({ path: 'UN_id', model: Unidad}).populate({ path: 'M_id', model: Marca}).populate({ path: 'T_id', model: Tienda});
        //console.log(alimentosIngresados);
        res.render('dashboard/foods', {alimentosIngresados});
    }catch(e){
        console.log(e.message);
        //req.flash('error_msg', 'Error al mostrar alimentos ingresados');
        //res.render('dashboard/das');
    }  
};

dashboardCtrl.renderRecipes = async (req, res) => {
    try{
        const recetas = await Receta.find();
        console.log(recetas);
        res.render('dashboard/recipes', {recetas});
    }catch(e){
        console.log(e.message);
    }  
};

dashboardCtrl.renderInventory = async (req, res) => {
    try{
        const U_id = req.user._id;
        const alimentosDistintosId = await AlimentoDeUsuario.find({U_id: U_id}).distinct('A_id');
            console.log(alimentosDistintosId, "\n--------------")
        const todosLosAlimentos = await AlimentoDeUsuario.find({U_id: U_id});
            console.log(todosLosAlimentos, "\n--------------")

            
        const alimentosSuma = [];
        let sumaCantidad = 0;
        
        for (const alimentoDistintoId of alimentosDistintosId) {

            const alimentoDistinto = await AlimentoDeUsuario.find({A_id: alimentoDistintoId, U_id: U_id}).limit(1).populate({ path: 'A_id', model: Alimento}).populate({ path: 'UN_id', model: Unidad});
                console.log(alimentoDistinto, "\n--------------")
            for (const alimentoDeTodosLosElementos of todosLosAlimentos) {
                    console.log(alimentoDeTodosLosElementos, "\n--------------")

                    console.log("¿Coinciden?: --- ", alimentoDistinto[0].A_id._id, " y este ", alimentoDeTodosLosElementos.A_id, "\n--------------")
                    
                    let comparar1 =alimentoDistinto[0].A_id._id.toString();
                        console.log(comparar1, "\n--------------")
                    let comparar2 = alimentoDeTodosLosElementos.A_id.toString();
                        console.log(comparar2, "\n--------------")

                if(comparar1 == comparar2){
                        console.log("coincidencia: ---------", alimentoDistinto[0].A_id._id, "=", alimentoDeTodosLosElementos.A_id, "\n--------------")
                    const cantidad = alimentoDeTodosLosElementos.AU_cantidad;
                        console.log(cantidad, "\n--------------")
                    sumaCantidad+= cantidad;
                        console.log(sumaCantidad, "\n--------------")
                }
            }

            const objCantidad = {};
            objCantidad.id = alimentoDistinto[0].A_id._id;
            objCantidad.nombre = alimentoDistinto[0].A_id.A_nombre;
            objCantidad.total = sumaCantidad;
            objCantidad.unidad = alimentoDistinto[0].UN_id.UN_unidad;
            
            sumaCantidad = 0;

            alimentosSuma.push(objCantidad);
                console.log(alimentosSuma, "\n--------------")

        }

        
        //console.log("Alimentos de Usuario con A_id diferentes: ---------------\n",alimentosUsuarioIds, "\n---------------------");
        res.render('dashboard/inventory', {alimentosSuma});

    }catch(e){

        console.log(e);

    }

};

dashboardCtrl.renderCategories = async (req, res) => {

    try{

        const U_id = req.user._id;

        const categorias = await Categoria.find();

        arrayCategoriasYCantidad = [];

        for (const categoria of categorias) {

            const objCategoria = {};

            const C_id = categoria._id;

            const cantidadPorCategoria = await AlimentoDeUsuario.countDocuments({U_id: U_id, C_id: C_id});

            objCategoria.categoria = categoria;
            objCategoria.categoriaCantidad = cantidadPorCategoria;

            arrayCategoriasYCantidad.push(objCategoria);

        }

        res.render('dashboard/categories', {arrayCategoriasYCantidad});

    }catch(e){
        console.log(e);
    }  

};



module.exports = dashboardCtrl;