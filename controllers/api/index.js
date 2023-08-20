const router = require('express').Router();
// const isAuthenticated = require("../../utils/middleware/isAuthenticated");
// Import the routes for posts, comments, and users

const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const cartRoutes = require('./cartRoutes');
const contactRoutes = require('./contactRoutes');
const pickUpRoutes = require('./pickupRoutes');
const galleryRoutes = require('./galleryRoutes');


router.use('/users', userRoutes);
router.use('/', productRoutes);
router.use('/', cartRoutes);
router.use('/', contactRoutes);
router.use('/', pickUpRoutes);
router.use('/', galleryRoutes);


module.exports = router;
