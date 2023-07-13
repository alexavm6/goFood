const { Router } = require('express');
const router = Router();

const { 
    renderCompleteCategorie,
    renderUpdateFood,
    updateFood,
    deleteFood
} = require('../controllers/categories.controller');

const { isAuthenticated } = require('../helpers/auth');


router.get('/categories/completecategorie/:id', isAuthenticated, renderCompleteCategorie);



router.get('/categories/edit/:id', isAuthenticated, renderUpdateFood);

router.put('/categories/edit/:id', isAuthenticated, updateFood);

router.delete('/categories/delete/:id', isAuthenticated, deleteFood);




module.exports = router;