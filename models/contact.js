const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Contact extends Model {}
Contact.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'contact',
  }
);
module.exports = Contact;