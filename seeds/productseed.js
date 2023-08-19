const sequelize = require('../config/connection');
const { Product, CartProduct, Gallery  } = require('../models'); // Import both models // Make sure the path is correct to import the Product model

const seedProducts = async () => {
  await sequelize.sync({ force: false }); // Drop and recreate tables

  try {
    //first, make sure the Gallery table is seeded before seeding this

    const productsData = [
      { id: 1,
        product_name: 'Chocolate Chip',
        price: 9.99,
        stock: 15,
        gallery_id: 1, 
      },
      { id: 2,
        product_name: 'Peanut Butter',
        price: 19.99,
        stock: 10,
        gallery_id: 2, 
      },
      { id: 3,
        product_name: 'Sugar',
        price: 19.99,
        stock: 10,
        gallery_id: 3, 
      },
      { id: 4,
        product_name: 'Red Velvet',
        price: 19.99,
        stock: 10,
        gallery_id: 4, 
      },
      { id: 5,
        product_name: 'Double Chocolate',
        price: 19.99,
        stock: 10,
        gallery_id: 5, 
      },
      { id: 6,
        product_name: 'Snickerdoodle',
        price: 19.99,
        stock: 10,
        gallery_id: 6, 
      },
      { id: 7,
        product_name: 'White Chocolate Macadamia Nut',
        price: 19.99,
        stock: 10,
        gallery_id: 7, 
      },
      { id: 8,
        product_name: 'Lemon Crinkle',
        price: 19.99,
        stock: 10,
        gallery_id: 8, 
      },
      
    ];

    // Bulk create products
    await Product.bulkCreate(productsData);

    console.log('Products seeded successfully');
  } catch (err) {
    console.error('Error seeding products:', err);
  }

  // process.exit(0); // Exit the process
};

seedProducts();
