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
  res.render("signup", { loggedIn: req.session.loggedIn });
});

router.get("/about", (req, res) => {
  res.render("about", { loggedIn: req.session.loggedIn });
});
router.get("/contact", (req, res) => {
  res.render('contact', {
       apiKey: process.env.GOOGLE_MAPS_API_KEY, loggedIn: req.session.loggedIn
   });
});
router.get("/contact-success", (req, res) => {
  res.render("contact-success", {loggedIn: req.session.loggedIn });
});



router.get("/success", (req, res) => {
  res.render("success", {loggedIn: req.session.loggedIn });
});
router.get("/contact-success", (req, res) => {
  res.render("contact-success", {loggedIn: req.session.loggedIn });
});




module.exports = router;
