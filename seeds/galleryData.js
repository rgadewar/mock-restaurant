const sequelize = require('../config/connection');
const { Gallery, Product } = require('../models'); // Import both Gallery and Product models

const seedGallery = async () => {
  await sequelize.sync({ force: true }); // Drop and recreate tables

  try {
    const galleryData = [
      {
        gallery_id: 1,
        product_name: 'Chocolate Chip',
        filename: '01-chocolatechip.jpg',
        description: 'A classic delight with a soft center and a symphony of melted chocolate chips in every bite.',
        ProductId: 1, // Associate with Product ID 1
      },
      {
        gallery_id: 2,
        product_name: 'Peanut Butter',
        filename: '02-peanutbutter.jpg',
        description: 'Buttery and nutty, these cookies offer a rich balance of sweet and savory flavors in a chewy texture.',
        ProductId: 2, // Associate with Product ID 2
      },
      {
        gallery_id: 3,
        product_name: 'Sugar',
        filename: '03-sugar.jpg',
        description: 'Delicate and charming, these cookies are like edible canvases, decorated with colorful icing and sprinkles.',
        ProductId: 3, 
      },
      {
        gallery_id: 4,
        product_name: 'Red Velvet',
        filename: '04-redvelvet.jpg',
        description: 'A crimson-hued marvel, combining the essence of cocoa and a hint of tanginess, topped with a velvety finish.',
        ProductId: 4, 
      },
      {
        gallery_id: 5,
        product_name: 'Double Chocolate',
        filename: '05-doublechocolate.jpg',
        description: 'Indulgence doubled – these cookies are a cocoa lovers dream, packed with both chocolate chunks and a cocoa-infused batter.',
        ProductId: 5, 
      },
      {
        // gallery_id: 6,
        product_name: 'Snickerdoodle',
        filename: '06-snickerdoodle.jpg',
        description: 'Coated in cinnamon-sugar, these soft, pillowy cookies offer a nostalgic blend of warmth and sweetness.',
        ProductId: 6, 
      },
      {
        gallery_id: 7,
        product_name: 'White Chocolate Macadamia Nut',
        filename: '07-whitechocmacadamia.jpg',
        description: 'A luxurious treat, featuring the delicate crunch of macadamia nuts and creamy white chocolate for a refined taste.',
        ProductId: 7, 
      },
      {
        gallery_id: 8,
        product_name: 'Lemon Crinkle',
        filename: '08-lemoncrinkle.jpg',
        description: 'Zesty and enchanting, these cookies have a delicate lemon essence and a crinkled exterior thats both soft and chewy.',
        ProductId: 8 
      }
    ];

    const insertedGallery = await Gallery.bulkCreate(galleryData, { returning: true });

    console.log('Gallery seeded successfully');

    // Associate Gallery entries with Products
    await Promise.all(
      insertedGallery.map(async (galleryEntry) => {
        const product = await Product.findByPk(galleryEntry.ProductId);
        if (product) {
          await galleryEntry.setProduct(product);
        }
      })
    );

    console.log('Associations between Gallery and Product set successfully');
  } catch (err) {
    console.error('Error seeding gallery:', err);
  }

  // process.exit(0); // Exit the process
};

seedGallery();
