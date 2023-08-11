const router = require('express').Router();
// const isAuthenticated = require("../../utils/middleware/isAuthenticated");
// Import the routes for posts, comments, and users

const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');

router.use('/users', userRoutes);
router.use('/products', productRoutes);

module.exports = router;
