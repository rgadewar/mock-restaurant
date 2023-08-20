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
          id:cartItem.id,
          productName: product.product_name,
          quantity: cartItem.quantity,
          price: cartItem.price,
          total: productTotal.toFixed(2) // Individual product total
        });
      }
    }

    // console.log("Serialized Cart:", serializedCart);

    // Render the 'cart' template with the serialized cart data and final total
    res.render("cart", { cartItems: serializedCart, finalTotal: finalTotal.toFixed(2), loggedIn: req.session.loggedIn });
    

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

    // Check if the product is already in the cart
    const cartProduct = await CartProduct.findOne({
      where: {
        user_id: user.id,
        product_id: product.id,
      },
    });

    try {
      if (cartProduct) {
        // Product already in cart, increase quantity
        const updatedQuantity = cartProduct.quantity + quantity;
        if (updatedQuantity > product.dataValues.stock) {
          const errorMessage = `Not enough stock for this product. Available stock: ${product.dataValues.stock}`;
          return res.status(400).json({ error: errorMessage });
        }
        cartProduct.quantity = updatedQuantity;
        await cartProduct.save();
      } else {
        // If the product is not in the cart, add it
        const result = await CartProduct.addProduct(user, product, { quantity });

        if (!result.success) {
          return res.status(400).json({ error: result.message });
        }
      }

      // Update the product's cartQuantity
      product.cartQuantity += quantity;
      await product.save();

      // Send a JSON response with success message
      res.status(200).json({ message: "Product added to cart successfully" });
    } catch (error) {
      console.error("Error adding/updating product to cart:", error);
      res.status(500).json({ error: "An error occurred while processing your request." });
    }
  } catch (err) {
    console.error("Error fetching product/user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Handle updating cart item quantity
router.put("/update-cart", isAuthenticated, async (req, res) => {
  const { id, quantity } = req.body;
  console.log("cartItemId", id);
  console.log("quantity", quantity);


  try {
    // Fetch the cart item by ID
    const cartItem = await CartProduct.update(req.body, {
      where: {
        id: id
      }
    });

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    // Send a JSON response with success message
    res.status(200).json({ message: "Cart item quantity updated successfully" });
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
});

// Handle deleting a cart item
router.delete("/delete-cart", isAuthenticated, async (req, res) => {
  const { id } = req.body;

  try {
    // Fetch the cart item by ID
    const cartItem = await CartProduct.destroy({
      where: {
        id: id
      }
    });

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }


    // Send a JSON response with success message
    res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
});

router.get('/cart/condensed', isAuthenticated, async (req, res) => {
  try {
    const Cart = await CartProduct.findAll({
      where: { user_id: req.session.passport.user.id }
    });
    let finalTotal = 0; // Initialize final total

    // Create an array to hold the condensed cart data
    const condensedCart = [];

    // Iterate through each cart item and find the associated product
    for (const cartItem of Cart) {
      const product = await Product.findByPk(cartItem.product_id);
      if (product) {
        const productTotal = cartItem.quantity * parseFloat(cartItem.price);
        finalTotal += productTotal; // Accumulate product totals for final total

        condensedCart.push({
          productName: product.product_name,
          quantity: cartItem.quantity,
          total: productTotal.toFixed(2) // Individual product total
        });
      }
    }

    // Add the final total to the condensed cart data
    condensedCart.push({
      productName: 'Final Total',
      quantity: '', // You can leave this empty or add an appropriate value
      total: finalTotal.toFixed(2)
    });

    // Send the condensed cart data as JSON response
    res.json(condensedCart);

  } catch (err) {
    console.error("Error fetching condensed cart data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



module.exports = router;

