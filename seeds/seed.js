const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const { User } = require('../models');

const seedUsers = async () => {
  await sequelize.sync({ force: false }); // This will recreate the User table

  const hashedPassword1 = await bcrypt.hash('password1', 10);
  const hashedPassword2 = await bcrypt.hash('password2', 10);
  const hashedPassword3 = await bcrypt.hash('test', 10);

  await User.bulkCreate([
    {
      email: 'user1@example.com', // Use email instead of username
      password: hashedPassword1,
    },
    {
      email: 'user2@example.com', // Use email instead of username
      password: hashedPassword2,
    },
    {
      email: 'test@gmail.com', // Use email instead of username
      password: hashedPassword3,
    },
    // Add more users as needed
  ]);

  console.log('Users seeded successfully');

  process.exit(0);
};

seedUsers();
