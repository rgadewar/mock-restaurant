const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const { User } = require('../models');

const seedUsers = async () => {
//   await sequelize.sync({ force: true }); // This will recreate the User table

  const hashedPassword1 = await bcrypt.hash('password1', 10);
  const hashedPassword2 = await bcrypt.hash('password2', 10);

  await User.bulkCreate([
    {
      email: 'user1',
      password: hashedPassword1,
    },
    {
      email: 'user2',
      password: hashedPassword2,
    },
    // Add more users as needed
  ]);

  console.log('Users seeded successfully');
};

seedUsers();
