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

router.get("/signup", (req, res) => {
  res.render("signup", { loggedIn: req.session.loggedIn });
});

router.get("/about", (req, res) => {
  res.render("about", { loggedIn: req.session.loggedIn });
});


router.get("/success", (req, res) => {
  res.render("success", {loggedIn: req.session.loggedIn });
});

// Generic error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack); // Log the error to the console
  res.status(500).render('error', { errorMessage: 'Something went wrong.' });
});
module.exports = router;
