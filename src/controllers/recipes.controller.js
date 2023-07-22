const AlimentoDeUsuario = require('../models/AlimentoDeUsuario');
const Alimento = require('../models/Alimento');
const Categoria = require('../models/Categoria');
const Unidad = require('../models/Unidad');
const Marca = require('../models/Marca');
const Tienda = require('../models/Tienda');
const Receta = require('../models/Receta');

const recipesCtrl = {};

recipesCtrl.renderPossible = async (req, res) => {
    try{
        const {_id} = req.user;
        const alimentosUsuario = [];

        const arrayRecetas = await Receta.find();
        console.log("arrayRecetas--------------", arrayRecetas);

        const alimentosUsuarioIds = await AlimentoDeUsuario.find({U_id: _id}).distinct('A_id');


        for (const alimentosUsuarioId of alimentosUsuarioIds) {
            const alimentoUsuarioEncotrado = await Alimento.findById(alimentosUsuarioId);
            alimentosUsuario.push(alimentoUsuarioEncotrado);
        }

        console.log("alimentosUsuarioAlimento--------------", alimentosUsuario);
           


        const arrayRecetasPosibles = [];
        let contadorCoincidencias = 0;



        for (const receta of arrayRecetas) {

            const recetaIngredientes = receta.R_ingredientes;
            
            for (const ingrediente of recetaIngredientes) {
                
                for (const alimento of alimentosUsuario) {

                    if(ingrediente.nombre == alimento.A_nombre){
                        console.log(ingrediente.nombre, "==" ,alimento.A_nombre)
                        contadorCoincidencias++;
                    }

                }
                

            }

            //Todos los ingredientes de la receta 1 han sido comparados con los alimentos del usuario
            
            if(contadorCoincidencias >= 2){
                arrayRecetasPosibles.push(receta);
                contadorCoincidencias = 0;
            }else{
                contadorCoincidencias = 0;
            }
            
    
        }

        console.log("Recetas posibles: ------------", arrayRecetasPosibles)
        
        res.render('recipes/possible', {arrayRecetasPosibles});

    }catch(e){
        console.log(e.message);
    }
};



recipesCtrl.renderCompleteRecipe = async (req, res) => {
    try{
        const recetaid = req.params.id;
        const recetaEncotrada = await Receta.findById(recetaid);
        const arrayIngredientes = recetaEncotrada.R_ingredientes;
        res.render('recipes/completerecipe', {recetaEncotrada, arrayIngredientes});
    }catch(e){
        console.log(e.message);
    }
};





module.exports = recipesCtrl;