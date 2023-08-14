const express = require('express');
const router = express.Router();
const { User, Product, CartProduct } = require('../../models');
const isAuthenticated = require("../../utils/auth"); // Require the middleware file

// Render the cart page
router.get('/cart', isAuthenticated, async (req, res) => {
  try {
    console.log("Route - req.session.userId:", req.session.passport.user.id); // Log the value

    // Fetch the user's cart items along with product details
    const user = await User.findByPk(req.session.passport.user.id, {
      include: [
        {
          model: CartProduct, // Correct the model name here
          include: [
            {
              model: Product,
            },
          ],
        },
      ],
    });

    // ... rest of the code ...
  } catch (err) {
    console.error("Error fetching cart items:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Handle adding a product to the cart
router.post('/add-to-cart', isAuthenticated, async (req, res) => {
  const { product_id, quantity } = req.body;

  try {
    // Fetch the selected product by ID
    const product = await Product.findByPk(product_id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Fetch the user
    const user = await User.findByPk(req.session.passport.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    try {
      // Add the selected product to the cart
      const result = await CartProduct.addProduct(user, product, { quantity });

      // if (result.success) {
      //   res.status(200).json({ message: result.message });
      // } else {
      //   res.status(400).json({ error: result.message });
      // }
       // Redirect to the success page
    res.redirect('/success'); // Replace "/success" with the actual success page URL
    } catch (error) {
      console.error("Error creating/getting cart:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (err) {
    console.error("Error adding product to cart:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;