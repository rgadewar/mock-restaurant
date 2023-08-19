const router = require('express').Router();
// const isAuthenticated = require("../../utils/middleware/isAuthenticated");
// Import the routes for posts, comments, and users

const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const cartRoutes = require('./cartRoutes');
const contactRoutes = require('./contactRoutes');
const pickUpRoutes = require('./pickupRoutes');



router.use('/users', userRoutes);
router.use('/', productRoutes);
router.use('/', cartRoutes);
router.use('/', contactRoutes);
router.use('/', pickUpRoutes);


module.exports = router;
