// User.js 
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');
const CartProduct = require('./cartProduct'); // Update the import statement
const Product = require('./Product'); // Import the Product model

class User extends Model {
  validPassword(loginPassword) {
    return bcrypt.compareSync(loginPassword, this.password);
  }

  async getCartProduct() {
    const cartProduct = await CartProduct.findOne({
      where: { user_id: this.id },
    });
    return cartProduct;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4],
      },
    },
  },
  {
    hooks: {
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

// Define the association
User.associate = function (models) {
  this.hasOne(models.CartProduct, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });
};

module.exports = User;
