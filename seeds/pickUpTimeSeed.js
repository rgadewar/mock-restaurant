const sequelize = require("../config/connection");
const { PickupTime } = require("../models");

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

// Call the seeding function
seedPickupTimes();
