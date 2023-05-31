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

dashboardCtrl.renderInventory = (req, res) => {
    res.render('dashboard/inventory');
};

dashboardCtrl.renderCategories = (req, res) => {
    res.render('dashboard/categories');
};



module.exports = dashboardCtrl;