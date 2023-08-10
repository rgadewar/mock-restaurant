const router = require('express').Router();
// const isAuthenticated = require("../../utils/middleware/isAuthenticated");
// Import the routes for posts, comments, and users

const userRoutes = require('./userRoutes');

// router.use('/', isAuthenticated, homeRoutes);

router.use('/', userRoutes);



module.exports = router;
