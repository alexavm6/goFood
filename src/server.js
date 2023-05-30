const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');

const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');


//Initializations
const app = express();
require('./config/passport');


/*
Es mucho muy importante que pongan el seteo de views antes del seteo del motor porque sio les va a aparecer un error  como este:
Error: ENOENT: no such file or directory, open 'C:\Users\yo\src\views\layouts\main.hbs'
que es un error de cuando no encuentran el archivo
*/
//Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
}));
app.set('view engine', '.hbs'); 

//Middlewares
app.use(morgan('dev')); 
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user_global = req.user || null;
    next();
});

//Routes
 app.use(require('./routes/index.routes'));
 app.use(require('./routes/user.routes'));
 app.use(require('./routes/dashboard.routes'));
 app.use(require('./routes/admin.routes'));

//Static Files
app.use(express.static(path.join(__dirname, 'public'))); 





module.exports = app;

