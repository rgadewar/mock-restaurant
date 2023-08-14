const sequelize = require('../config/connection');
const { Product, CartItem } = require('../models'); // Import both models // Make sure the path is correct to import the Product model

const seedProducts = async () => {
  await sequelize.sync({ force: true }); // Drop and recreate tables

  try {
    const productsData = [
      {
        product_name: 'Product 1',
        price: 9.99,
        stock: 15,
      },
      {
        product_name: 'Product 2',
        price: 19.99,
        stock: 10,
      },
      // Add more products here
    ];

    // Bulk create products
    await Product.bulkCreate(productsData);

    console.log('Products seeded successfully');
  } catch (err) {
    console.error('Error seeding products:', err);
  }

  process.exit(0); // Exit the process
};

seedProducts();
