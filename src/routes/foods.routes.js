const { Router } = require('express');
const router = Router();

const { 
    renderNewFood,
    newFood
} = require('../controllers/foods.controller');

const { isAuthenticated } = require('../helpers/auth');

router.get('/foods/newfood', isAuthenticated, renderNewFood);

router.post('/foods/newfood', isAuthenticated, newFood);


module.exports = router;