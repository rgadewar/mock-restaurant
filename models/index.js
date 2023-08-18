const User = require('./User');
const Product = require('./product');
const Gallery = require('./Gallery');
const CartProduct = require('./cartProduct');
const Contact = require('./contact'); // Import the Contact model

// Define associations
User.hasMany(CartProduct, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

CartProduct.belongsTo(User, {
  foreignKey: 'user_id'
});

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

// Define the association between User and Contact
User.hasMany(Contact, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Contact.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Product, CartProduct, Gallery, Contact };
