
// models/index.js
const sequelize = require('../config/connection'); 
const User = require('./User');


// Export your models
module.exports = { User, sequelize };