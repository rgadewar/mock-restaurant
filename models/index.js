// index.js
const User = require('./User');
const Product = require('./Product');
const Gallery = require('./Gallery');
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

Gallery.hasMany(Product, {
  foreignKey: 'gallery_id',
});

Product.belongsTo(Gallery, {
  foreignKey: 'gallery_id',
});

module.exports = { User, Product, CartProduct, Gallery };
