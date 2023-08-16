const router = require("express").Router();
const { User, Product, Gallery } = require("../models");

const passport = require("../config/passport");
const isAuthenticated = require("../utils/auth"); // Require the middleware file
const path = require("path");
const fs = require("fs");

router.get("/", (req, res) => {
  res.render("home", { loggedIn: req.session.loggedIn });
});

router.get("/home", (req, res) => {
  res.render("home", { loggedIn: req.session.loggedIn });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/home");
    return;
  }
  res.render("login");
});

// GET route to render the signup page
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/about", (req, res) => {
  res.render("about");
});
router.get("/contact", (req, res) => {
  res.render('contact', {
       apiKey: process.env.GOOGLE_MAPS_API_KEY
   });
});

router.get("/gallery", async (req, res) => {
  try {
    const galleries = await Gallery.findAll();
    const imageUrls = galleries.map((gallery) => gallery.filename);
    res.render("gallery", { images: imageUrls });
  } catch (err) {
    console.error("Error fetching gallery images:", err);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/success", (req, res) => {
  res.render("success");
});

// Inside your router configuration
router.get("/menu", isAuthenticated, async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.findAll();

    // Render the 'menu' template and pass the products data
    res.render("menu", { loggedIn: req.session.loggedIn, products });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
