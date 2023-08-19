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
      allowNull: false
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false
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
