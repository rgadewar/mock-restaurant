const express = require("express");
const router = express.Router();
const { User, Product, CartProduct } = require("../../models");
const isAuthenticated = require("../../utils/auth"); // Require the middleware file

// Render the cart page
router.get("/cart", isAuthenticated, async (req, res) => {
  try {
    const Cart = await CartProduct.findAll({
      where: { user_id: req.session.passport.user.id }
    });

    console.log("********Cart:", Cart);

    let finalTotal = 0; // Initialize final total

    // Create an array to hold the serialized cart data
    const serializedCart = [];

    // Iterate through each cart item and find the associated product
    for (const cartItem of Cart) {
      const product = await Product.findByPk(cartItem.product_id);
      if (product) {
        const productTotal = cartItem.quantity * parseFloat(cartItem.price);
        finalTotal += productTotal; // Accumulate product totals for final total

        serializedCart.push({
          productName: product.product_name,
          quantity: cartItem.quantity,
          price: cartItem.price,
          total: productTotal.toFixed(2) // Individual product total
        });
      }
    }

    console.log("Serialized Cart:", serializedCart);

    // Render the 'cart' template with the serialized cart data and final total
    res.render("cart", { cartItems: serializedCart, finalTotal: finalTotal.toFixed(2) });

  } catch (err) {
    console.error("Error fetching cart items:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Handle adding a product to the cart
router.post("/add-to-cart", isAuthenticated, async (req, res) => {
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
      res.redirect("/success"); // Replace "/success" with the actual success page URL
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
