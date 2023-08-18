// index.js
const User = require('./User');
const Product = require('./product');
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

Product.belongsTo(CartProduct, {
  foreignKey: 'cartProduct_id'
});

CartProduct.hasMany(Product, {
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
