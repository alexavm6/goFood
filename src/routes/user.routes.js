const { Router } = require('express');
const router = Router();

const { isAuthenticated } = require('../helpers/auth');

const { 
    renderLogin,
    login, 
    logout
} = require('../controllers/user.controller');

router.get('/user/login', renderLogin);

router.post('/user/login', login);

router.get('/user/logout', isAuthenticated, logout);



module.exports = router;