const userCtrl = {};

const passport = require('passport');

userCtrl.renderLogin = (req, res) => {
    res.render('user/login');
};

userCtrl.login = passport.authenticate('local', {
    failureRedirect: '/user/login',
    successRedirect: '/dashboard',
    failureFlash: true
});

userCtrl.logout = (req, res, next) => {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        req.flash('success_msg', 'Sesión cerrada exitosamente');
        res.redirect('/user/login');
    });
    /*
    req.flash('success_msg', 'Sesión cerrada exitosamente');
    res.redirect('/user/login');
    */
};

module.exports = userCtrl;