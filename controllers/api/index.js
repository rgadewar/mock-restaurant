const router = require('express').Router();
// const isAuthenticated = require("../../utils/middleware/isAuthenticated");
// Import the routes for posts, comments, and users

const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const cartRoutes = require('./cartRoutes');

router.use('/users', userRoutes);
router.use('/', productRoutes);
router.use('/', cartRoutes);

module.exports = router;
