const { Router } = require('express');
const router = Router();

const { 
    renderDashboard,
    renderFood,
    renderRecipes, 
    renderInventory,
    renderCategories 
} = require('../controllers/dashboard.controller');

const { isAuthenticated } = require('../helpers/auth');

router.get('/dashboard', isAuthenticated, renderDashboard);

router.get('/dashboard/food', isAuthenticated, renderFood);

router.get('/dashboard/recipes', isAuthenticated, renderRecipes);

router.get('/dashboard/inventory', isAuthenticated, renderInventory);

router.get('/dashboard/categories', isAuthenticated, renderCategories);


module.exports = router;