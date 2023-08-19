const express = require('express');
const router = express.Router();
const { PickupTime } = require('../../models');

const isAuthenticated = require("../../utils/auth"); // Require the middleware file

router.get('/pickup', isAuthenticated, (req, res) => {
    res.render('pickup');
});

router.post('/pickup', async (req, res) => {
    try {
        // Extract form data from the request
        const { time, name, phone } = req.body;
        console.log("*************Client Res", time, name, phone);
       

        // Create a new entry in the PickupTime table with the user ID
        const newPickupTime = await PickupTime.create({
            user_id: id,
            time: time,
            name: name,
            phone: phone
        });

        // Process the data as needed

        res.send(`Thank you, ${name}! Your pickup is scheduled for ${time}. We'll contact you at ${phone}.`);
    } catch (error) {
        console.error("Error creating PickupTime:", error); // Log the entire error object
        res.status(500).send('An error occurred while processing your request.');
    }
});

module.exports = router;