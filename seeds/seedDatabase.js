const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");
const { User, Product, CartItem, Gallery } = require("../models");

const seedUsers = async () => {
    await sequelize.sync({ force: true }); // This will recreate the User table

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

const seedProducts = async () => {
    await sequelize.sync({ force: true }); // Drop and recreate tables

    try {
      const productsData = [
        {
          product_name: "Product 1",
          price: 9.99,
          stock: 15,
        },
        {
          product_name: "Product 2",
          price: 19.99,
          stock: 10,
        },
        // Add more products here
      ];

      // Bulk create products
      await Product.bulkCreate(productsData);

      console.log("Products seeded successfully");
    } catch (err) {
      console.error("Error seeding products:", err);
    }
};

const seedGallery = async () => {
    await sequelize.sync({ force: true }); // Drop and recreate tables

    try {
      const galleryData = [
        {
          product_name: "Chocolate Chip",
          filename: "01-chocolatechip.jpg",
          description:
            "A classic delight with a soft center and a symphony of melted chocolate chips in every bite.",
        },
        {
          product_name: "Peanut Butter",
          filename: "02-peanutbutter.jpg",
          description:
            "Buttery and nutty, these cookies offer a rich balance of sweet and savory flavors in a chewy texture.",
        },
        {
          product_name: "Sugar",
          filename: "03-sugar.jpg",
          description:
            "Delicate and charming, these cookies are like edible canvases, decorated with colorful icing and sprinkles.",
        },
        {
          product_name: "Red Velvet",
          filename: "04-redvelvet.jpg",
          description:
            "A crimson-hued marvel, combining the essence of cocoa and a hint of tanginess, topped with a velvety finish.",
        },
        {
          product_name: "Double Chocolate",
          filename: "05-doublechocolate.jpg",
          description:
            "Indulgence doubled – these cookies are a cocoa lovers dream, packed with both chocolate chunks and a cocoa-infused batter.",
        },
        {
          product_name: "Snickerdoodle",
          filename: "06-snickerdoodle.jpg",
          description:
            "Coated in cinnamon-sugar, these soft, pillowy cookies offer a nostalgic blend of warmth and sweetness.",
        },
        {
          product_name: "White Chocolate Macadamia Nut",
          filename: "07-whitechocmacadamia.jpg",
          description:
            "A luxurious treat, featuring the delicate crunch of macadamia nuts and creamy white chocolate for a refined taste.",
        },
        {
          product_name: "Lemon Crinkle",
          filename: "08-lemoncrinkle.jpg",
          description:
            "Zesty and enchanting, these cookies have a delicate lemon essence and a crinkled exterior thats both soft and chewy.",
        },
      ];

      await Gallery.bulkCreate(galleryData);

      console.log("Gallery seeded successfully");
    } catch (err) {
      console.error("Error seeding products:", err);
    }
};


(async () => {
  await seedUsers();
  await seedProducts();
  await seedGallery();
})();