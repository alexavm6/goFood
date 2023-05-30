const AlimentoDeUsuario = require('../models/AlimentoDeUsuario');
const Alimento = require('../models/Alimento');
const Categoria = require('../models/Categoria');
const Unidad = require('../models/Unidad');
const Marca = require('../models/Marca');
const Tienda = require('../models/Tienda');

const foodsCtrl = {};

foodsCtrl.renderNewFood = async (req, res) => {
    res.render('foods/newfood');
};

foodsCtrl.newFood = async (req, res) => {
    res.send('post new food');
    
};




module.exports = foodsCtrl;