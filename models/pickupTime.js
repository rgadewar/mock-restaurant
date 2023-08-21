const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PickupTime extends Model {}

PickupTime.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   is: /^(\d{3}-\d{3}-\d{4})$|^\d{10}$/ // Regular expression to validate either 10-digit or XXX-XXX-XXXX format phone number
      // }
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
      unique: 'user_time_unique', // Define a unique constraint
      get() {
        const rawValue = this.getDataValue('time');
        if (rawValue) {
          const formattedTime = new Date(`1970-01-01T${rawValue}Z`)
            .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
          return formattedTime;
        }
        return null;
      }
    }
  },
  {
    sequelize,
    timestamps: false, // Disable timestamps for this table
    freezeTableName: true,
    underscored: true,
    modelName: 'PickupTime'
  }
);

module.exports = PickupTime;
