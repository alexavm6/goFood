const userCtrl = {};

const User = require('../models/User');

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



userCtrl.renderSignup = (req, res) => {
    res.render('user/signup');
};


userCtrl.signup = async (req, res) => {
    const errors = [];
    const { 
        user,
        document_type,
        document_number,
        names,
        last_names,
        email,
        address,
        phone_number,
        password,
        confirm_password
    } = req.body;

    if (password != confirm_password) {
        errors.push({text: 'Las contraseñas no coinciden'});
    }
    
    if (password.length < 8) {
        errors.push({text: 'Las contraseñas deben tener al menos 8 caracteres'});
    }

    if (errors.length > 0) {
        res.render('user/signup', {
            errors,
            user,
            document_type,
            document_number,
            names,
            last_names,
            email,
            address,
            phone_number,
            password,
            confirm_password
        });

    }else{

        const { 
            user,
            email,
            document_number
        } = req.body;

        console.log(user, email, document_number);

        const user1 = await User.findOne({user: user}); 
        console.log('Usuario', user1);
        if (user1) {
            errors.push({text: 'Ya existe un usuario con este codigo'});
        }
        
        /*
        const email1 = await User.findOne({email: email});
        console.log('Email', email1);
        if (email1) {
            errors.push({text: 'Ya existe un usuario con este email'});
        }
        */
        
        const document_number1 = await User.findOne({document_number: document_number});
        console.log('Numero de documento', document_number1);
        if (document_number1) {
            errors.push({text: 'Ya existe un usuario con este numero de documento'});
        }

        if (errors.length > 0) {
            res.render('user/signup', {
                errors,
                user,
                document_type,
                document_number,
                names,
                last_names,
                email,
                address,
                phone_number,
                password,
                confirm_password
            });
        }else{
            const newUser = new User({
                user,
                document_type,
                document_number,
                names,
                last_names,
                email,
                address,
                phone_number,
                password
            });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'Usuario registrado exitosamente');
            res.redirect('/user/login'); 
            
        }
        
    }


};



module.exports = userCtrl;