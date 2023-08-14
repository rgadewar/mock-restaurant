const router = require('express').Router();
const { User } = require('../models');

const passport = require("../config/passport");
const isAuthenticated = require("../utils/auth"); // Require the middleware file

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
res.render('login');
});


// GET route to render the signup page
router.get('/signup', (req, res) => {
    res.render('signup'); // Replace 'signup' with the actual template name
});

// Inside your router configuration
router.get('/menu',(req, res) => {
    res.render('menu'); // Render the 'home.handlebars' template
});

module.exports = router;