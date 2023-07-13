const { Router } = require('express');
const router = Router();

const { isAuthenticated } = require('../helpers/auth');

const { 
    renderLogin,
    login, 
    logout,
    renderSignup,
    signup
} = require('../controllers/user.controller');

router.get('/user/login', renderLogin);

router.post('/user/login', login);

router.get('/user/logout', isAuthenticated, logout);


router.get('/user/signup', renderSignup);

router.post('/user/signup', signup);


module.exports = router;