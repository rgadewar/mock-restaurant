const router = require('express').Router();
const { User } = require('../../models');
// const passport = require("../../config/passport");
const bcrypt = require('bcrypt');

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login'); // Redirect to the login page if not authenticated
};



// Route for user login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user by email
    const user = await User.findOne({
      where: { email }
    });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    // Set session data or token if authentication is successful
    req.session.loggedIn = true; // Example of setting session data
    res.json({ message: 'Login successful' });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post('/signup', async (req, res) => {
  try {
    // Check if a user with the same email already exists in the database
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (existingUser) {
      // User with the same email already exists, return an error response
      return res.status(409).json({ error: "Email already in use" });
    }
    // Create the new user if the email is unique
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
    });
    // User created successfully, send a success message in the response
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    // Error during signup, log the error details for debugging
    console.error("Error during user creation:", err);
    res.status(400).json({ error: "Failed to create user" });
  }
});
// POST - user logged out
router.post('/logout', (req, res) => {
  if(req.session.loggedIn){
      req.session.destroy(() => {
          res.status(204).end();
      });
  } else {
      res.status(404).end();
  }
});
router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err); // Log the error for debugging
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

module.exports = router;














