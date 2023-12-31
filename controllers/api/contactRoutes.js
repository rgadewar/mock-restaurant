const express = require('express');
const router = express.Router();
const { Contact } = require('../../models'); // Import the Contact model
// Route to handle the form submission
router.post('/contact', async (req, res) => {
  try {
    // Extract form data from the request
    const { name, email, message } = req.body;
    // Save contact details to the database
    const contact = await Contact.create({
      name,
      email,
      message,
    });
    // Redirect or render a success page
    res.redirect('/api/contact-success'); // Change this to the desired redirect or success page
  } catch (error) {
    console.error(error);
    // Handle the error, redirect, or render an error page
    res.redirect('/error'); // Change this to the desired error page
  }
});

router.get("/contact", (req, res) => {
  res.render('contact', {
       apiKey: process.env.GOOGLE_MAPS_API_KEY, loggedIn: req.session.loggedIn
   });
});

router.get("/contact-success", (req, res) => {
  res.render("contact-success", {loggedIn: req.session.loggedIn });
});

module.exports = router;