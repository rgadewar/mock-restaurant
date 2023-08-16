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
// router.get('/product-details', isAuthenticated, async (req, res) => {
//   console.log("Endpoint hit!"); // Add this line
//   const productId = req.params.productId; // Use req.params.productId
//   console.log("**************productId", productId);

//   try {
//     // Fetch the product from the database using the provided product ID
//     const product = await Product.findByPk(productId);

//     if (!product) {
//       console.log(`Product with ID ${productId} not found.`);
//     } else {
//       console.log('Retrieved product from database:', product);
//       res.render('product', { product });
//     }
//   } catch (error) {
//     console.error('Error retrieving product:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// Render the product page
// router.get('/product-details/:id', isAuthenticated, async (req, res) => {
//   const productId = req.params.id;
//   const product = await Product.findByPk(productId);
  
//   res.render('product', { 
//     loggedIn: true,  // Assuming the user is logged in
//     body: 'product', // 'product' is the name of the partial view (without '.handlebars')
//     product
//   });
// });
// router.get('/product-details/:productId', async (req, res) => {
//   try {
//     const productId = 1; // Replace with the actual product ID you want to retrieve
//     const product = await Product.findByPk(productId);
  
//     if (!product) {
//       console.log(`Product with ID ${productId} not found.`);
//     } else {
//       console.log('Product details:', product.toJSON());
//     }
//   } catch (error) {
//     console.error('Error retrieving product:', error);
//   }
  
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