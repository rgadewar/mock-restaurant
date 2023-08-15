// CartProduct.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Product = require("./Product"); // Make sure the path is correct

class CartProduct extends Model {
  static async addProduct(user, product, { quantity }) {
    try {
      // Check if the product is already in the user's cart
      const existingCartProduct = await CartProduct.findOne({
        where: {
          user_id: user.id,
          product_id: product.id,
        },
      });

      // if (existingCartProduct) {
      //   throw new Error("Product already in cart");
      // }

      // Create a new CartProduct entry with the provided data
      await CartProduct.create({
        user_id: user.id,
        product_id: product.id,
        quantity: quantity,
        price: product.price, // Use the fetched product price
      });

      console.log("Product added to cart successfully");
      return { success: true, message: "Product added to cart successfully" };
    } catch (error) {
      console.error("Error creating/getting cart:", error);
      return { success: false, message: "Error adding product to cart" };
    }
  }

  getCartProduct = async function () {
    try {
      console.log("Getting cart product for user ID:", this.user_id); // Log user ID

      const cartProduct = await CartProduct.findOne({
        where: { user_id: this.user_id },
        include: [Product],
      });

      if (cartProduct) {
        console.log("Cart product found:", cartProduct.id);
      } else {
        console.log("Cart product not found.");
      }

      return cartProduct;
    } catch (error) {
      console.error("Error fetching cart product:", error);
      return null;
    }
  };
}

CartProduct.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "product",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
  },
  {
    sequelize,
    timestamps: false, // Disable timestamps
    underscored: true,
    modelName: "cart_product",
  }
);

module.exports = CartProduct;
