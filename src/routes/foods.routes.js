const { Router } = require('express');
const router = Router();

const { 
    renderNewFood,
    newFood,
    renderUpdateFood,
    updateFood,
    deleteFood
} = require('../controllers/foods.controller');

const { isAuthenticated } = require('../helpers/auth');

router.get('/foods/newfood', isAuthenticated, renderNewFood);

router.post('/foods/newfood', isAuthenticated, newFood);

router.get('/foods/edit/:id', isAuthenticated, renderUpdateFood);

router.put('/foods/edit/:id', isAuthenticated, updateFood);

router.delete('/foods/delete/:id', isAuthenticated, deleteFood);




module.exports = router;