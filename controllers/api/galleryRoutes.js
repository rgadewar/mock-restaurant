const express = require('express');
const router = express.Router();
const { Gallery } = require('../../models');

const isAuthenticated = require("../../utils/auth"); // Require the middleware file


router.get("/gallery", async (req, res) => {
    try {
      const galleries = await Gallery.findAll();
      const imageUrls = galleries.map((gallery) => gallery.filename);
      res.render("gallery", { images: imageUrls, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.error("Error fetching gallery images:", err);
      return res.status(500).send("Internal Server Error");
    }
  });


module.exports = router;
