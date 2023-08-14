const router = require('express').Router();
const { User, Product } = require('../models');


const passport = require("../config/passport");
const isAuthenticated = require("../utils/auth"); // Require the middleware file

router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/menu');
        return;
    }
    res.render('login');
    });

  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/menu');
        return;
    }
    res.render('login');
    });


// GET route to render the signup page
router.get('/signup', (req, res) => {
    res.render('signup'); // Replace 'signup' with the actual template name
});

// Inside your router configuration
// router.get('/menu',isAuthenticated, (req, res) => {
//     res.render('menu', { loggedIn: req.session.loggedIn }); // Pass loggedIn to the template context
// });

// Inside your router configuration
router.get('/menu', isAuthenticated, async (req, res) => {
    try {
      // Fetch all products from the database
      const products = await Product.findAll();
      
      // Render the 'menu' template and pass the products data
      res.render('menu', { loggedIn: req.session.loggedIn, products });
    } catch (err) {
      console.error("Error fetching products:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

module.exports = router;