const express = require('express');
const router = express.Router();
const { Product } = require('../../models')
const isAuthenticated = require("../../utils/auth"); // Require the middleware file

router.get('/products', async (req, res) => {
  console.log("Endpoint hit!"); // Add this line
    try {
        const products = await Product.find()
        res.status(200).send({ data: products })
    } catch (err) {
        res.status(400).send({ error: err })
    }
})

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