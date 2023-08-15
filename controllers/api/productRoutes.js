const express = require('express');
const router = express.Router();
const { Product } = require('../../models')
const isAuthenticated = require("../../utils/auth"); // Require the middleware file

router.get('/products', async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).send({ data: products })
    } catch (err) {
        res.status(400).send({ error: err })
    }
})

// router.get('/products-by-categories', async (req, res) => {
//     try {
//       const products = await Product.findAll({
//         include: [{ model: user }],
//       });
//       res.status(200).json(userData);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
  
  router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });
   
// Render the product page
// router.get('/product/:id', isAuthenticated, async (req, res) => {
//   const productId = req.params.id;
//   const product = await Product.findByPk(productId);
//   res.render('product', { product });
// });
// Render the product page
router.get('/product/:id', isAuthenticated, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findByPk(productId);
  
  res.render('product', { 
    loggedIn: true,  // Assuming the user is logged in
    body: 'product', // 'product' is the name of the partial view (without '.handlebars')
    product
  });
});



module.exports = router