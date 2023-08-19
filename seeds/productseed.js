const sequelize = require('../config/connection');
const { Product, CartItem,  } = require('../models'); // Import both models // Make sure the path is correct to import the Product model

const seedProducts = async () => {
  await sequelize.sync({ force: true }); // Drop and recreate tables

  try {
    //first, make sure the Gallery table is seeded before seeding this

    const productsData = [
      {
        id: 1,
        product_name: 'Chocolate Chip',
        price: 1.99,
        stock: 30,
        // gallery_id: 1, 
      },
      {
        id: 2,
        product_name: 'Peanut Butter',
        price: 2.99,
        stock: 27,
        // gallery_id: 2, 
      },
      {
        id: 3,
        product_name: 'Sugar',
        price: 1.99,
        stock: 30,
        // gallery_id: 3, 
      },
      {
        id: 4,
        product_name: 'Red Velvet',
        price: 3.99,
        stock: 18,
        // gallery_id: 4, 
      },
      {
        id: 5,
        product_name: 'Double Chocolate',
        price: 2.99,
        stock: 20,
        // gallery_id: 5, 
      },
      {
        id: 6,
        product_name: 'Snickerdoodle',
        price: 1.99,
        stock: 25,
        // gallery_id: 6, 
      },
      {
        id: 7,
        product_name: 'White Chocolate Macadamia Nut',
        price: 2.99,
        stock: 30,
        // gallery_id: 7, 
      },
      {
        id: 8,
        product_name: 'Lemon Crinkle',
        price: 2.99,
        stock: 28,
        // gallery_id: 8, 
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
