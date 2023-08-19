const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");
const { User, Product, CartItem, Gallery, PickupTime } = require("../models");

const seedUsers = async () => {
  await sequelize.sync({ force: false }); // This will recreate the User table

  const hashedPassword1 = await bcrypt.hash("password1", 10);
  const hashedPassword2 = await bcrypt.hash("password2", 10);

  await User.bulkCreate([
    {
      email: "user1@example.com", // Use email instead of username
      password: hashedPassword1,
    },
    {
      email: "user2@example.com", // Use email instead of username
      password: hashedPassword2,
    },
    // Add more users as needed
  ]);

  console.log("Users seeded successfully");
};

const seedGallery = async () => {
  await sequelize.sync({ force: false }); // Drop and recreate tables

  
    try {
    const galleryData = [
      {
        gallery_id: 1,
        product_name: 'Chocolate Chip',
        filename: '01-chocolatechip.jpg',
        description: 'A classic delight with a soft center and a symphony of melted chocolate chips in every bite.'
       
      },
      {
        gallery_id: 2,
        product_name: 'Peanut Butter',
        filename: '02-peanutbutter.jpg',
        description: 'Buttery and nutty, these cookies offer a rich balance of sweet and savory flavors in a chewy texture.'
       
      },
      {
        gallery_id: 3,
        product_name: 'Sugar',
        filename: '03-sugar.jpg',
        description: 'Delicate and charming, these cookies are like edible canvases, decorated with colorful icing and sprinkles.'
        
      },
      {
        gallery_id: 4,
        product_name: 'Red Velvet',
        filename: '04-redvelvet.jpg',
        description: 'A crimson-hued marvel, combining the essence of cocoa and a hint of tanginess, topped with a velvety finish.'
        
      },
      {
        gallery_id: 5,
        product_name: 'Double Chocolate',
        filename: '05-doublechocolate.jpg',
        description: 'Indulgence doubled – these cookies are a cocoa lovers dream, packed with both chocolate chunks and a cocoa-infused batter.'
        
      },
      {

        gallery_id: 6,
        product_name: 'Snickerdoodle',
        filename: '06-snickerdoodle.jpg',
        description: 'Coated in cinnamon-sugar, these soft, pillowy cookies offer a nostalgic blend of warmth and sweetness.'
        
      },
      {
        gallery_id: 7,
        product_name: 'White Chocolate Macadamia Nut',
        filename: '07-whitechocmacadamia.jpg',
        description: 'A luxurious treat, featuring the delicate crunch of macadamia nuts and creamy white chocolate for a refined taste.'
       
      },
      {
        gallery_id: 8,
        product_name: 'Lemon Crinkle',
        filename: '08-lemoncrinkle.jpg',
        description: 'Zesty and enchanting, these cookies have a delicate lemon essence and a crinkled exterior thats both soft and chewy.'
       
      }
    ];

    await Gallery.bulkCreate(galleryData);

    console.log("Gallery seeded successfully");
  } catch (err) {
    console.error("Error seeding products:", err);
  }
};

const seedProducts = async () => {
  await sequelize.sync({ force: false }); // Drop and recreate tables

  try {
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

    console.log("Products seeded successfully");
  } catch (err) {
    console.error("Error seeding products:", err);
  }
};

const seedPickupTimes = async () => {
  await sequelize.sync({ force: false }); // Drop and recreate tables

  try {
    const pickupTimeData = [
      { id: 1,
        name: "John Doe",
        phone: "123-456-7890",
        time: "12:00 PM",
        user_id: 1,
      },
      { id: 2,
        name: "Jane Smith",
        phone: "987-654-3210",
        time: "03:30 PM",
        user_id: 2,
      },
      // Add more pickup time data entries here
    ];

    const formattedPickupTimeData = pickupTimeData.map(data => {
      const formattedTime = new Date(`2000-01-01 ${data.time}`).toISOString().substr(11, 8);
      return {
        ...data,
        time: formattedTime
      };
    });
    
    await PickupTime.bulkCreate(formattedPickupTimeData);

    console.log("PickupTimes seeded successfully");
  } catch (err) {
    console.error("Error seeding PickupTime:", err);
  }
};
(async () => {
  await seedUsers();
  await seedGallery();
  await seedProducts();
  await seedPickupTimes();
  
})();
