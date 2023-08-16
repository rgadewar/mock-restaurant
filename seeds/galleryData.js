const sequelize = require('../config/connection');
const { Gallery } = require('../models');

const seedGallery = async () => {
  await sequelize.sync({ force: false }); // Drop and recreate tables

  try {
    const galleryData = [
      {
        product_name: 'Chocolate Chip',
        filename: '01-chocolatechip.jpg',
        description: 'A classic delight with a soft center and a symphony of melted chocolate chips in every bite.',
      },
      {
        product_name: 'Peanut Butter',
        filename: '02-peanutbutter.jpg',
        description: 'Buttery and nutty, these cookies offer a rich balance of sweet and savory flavors in a chewy texture.',
      },
      {
        product_name: 'Sugar',
        filename: '03-sugar.jpg',
        description: 'Delicate and charming, these cookies are like edible canvases, decorated with colorful icing and sprinkles.',
      },
      {
        product_name: 'Red Velvet',
        filename: '04-redvelvet.jpg',
        description: 'A crimson-hued marvel, combining the essence of cocoa and a hint of tanginess, topped with a velvety finish.',
      },
      {
        product_name: 'Double Chocolate',
        filename: '05-doublechocolate.jpg',
        description: 'Indulgence doubled – these cookies are a cocoa lovers dream, packed with both chocolate chunks and a cocoa-infused batter.',
      },
      {
        product_name: 'Snickerdoodle',
        filename: '06-snickerdoodle.jpg',
        description: 'Coated in cinnamon-sugar, these soft, pillowy cookies offer a nostalgic blend of warmth and sweetness.',
      },
      {
        product_name: 'White Chocolate Macadamia Nut',
        filename: '07-whitechocmacadamia.jpg',
        description: 'A luxurious treat, featuring the delicate crunch of macadamia nuts and creamy white chocolate for a refined taste.',
      },
      {
        product_name: 'Lemon Crinkle',
        filename: '08-lemoncrinkle.jpg',
        description: 'Zesty and enchanting, these cookies have a delicate lemon essence and a crinkled exterior thats both soft and chewy.',
      }
    ];

    await Gallery.bulkCreate(galleryData);

    console.log('Gallery seeded successfully');
  } catch (err) {
    console.error('Error seeding products:', err);
  }

  process.exit(0); // Exit the process
};

seedGallery();
