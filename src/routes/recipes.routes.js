const { Router } = require('express');
const router = Router();

const { 
    renderPossible,
    renderCompleteRecipe
} = require('../controllers/recipes.controller');

const { isAuthenticated } = require('../helpers/auth');

router.get('/recipes/possible', isAuthenticated, renderPossible);

router.get('/recipes/completerecipe/:id', isAuthenticated, renderCompleteRecipe);






module.exports = router;