// index.js
const User = require('./User');
const Product = require('./Product');
const CartProduct = require('./cartProduct'); // Update the import statement

// User-CartProduct relationship
User.hasOne(CartProduct, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

CartProduct.belongsTo(User, {
  foreignKey: 'user_id'
});

// CartProduct-Product relationship
CartProduct.belongsTo(Product, {
  foreignKey: 'product_id'
});

Product.hasMany(CartProduct, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE'
});

module.exports = { User, Product, CartProduct };
