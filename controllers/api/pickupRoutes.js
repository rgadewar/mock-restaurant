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
        const { user_id, pickup_time, name, phone } = req.body;
        // console.log("Body", user_id, pickup_time, name, phone)
        
        // Convert the pickup_time to the correct format (HH:mm:ss)
        const formattedTime = convertToFormattedTime(pickup_time);

        // Check if a pickup time entry exists for the user
        const existingPickupTime = await findExistingPickupTime(req.session.passport.user.id);

        if (existingPickupTime) {
            await updateExistingPickupTime(existingPickupTime, formattedTime, name, phone);
        } else {
            await createNewPickupTime(req.session.passport.user.id, formattedTime, name, phone);
        }

        // Respond with a success message and chosen time
        res.status(200).json({
            successMessage: "Form data processed successfully",
            chosenTime: formattedTime // Replace with the actual chosen time
        });
    } catch (error) {
        console.error("Error processing form data:", error);
        res.status(500).json({ errorMessage: "An error occurred while processing the form data" });
    }
});

router.get('/pickup/result', isAuthenticated, (req, res) => {
    const chosenPickupTime = req.query.chosenTime;

    res.render('result', { chosenPickupTime, loggedIn: req.session.loggedIn});   
});

async function findExistingPickupTime(userId) {
    return await PickupTime.findOne({
        where: {
            user_id: userId
        }
    });
}

async function updateExistingPickupTime(existingPickupTime, time, name, phone) {
    await existingPickupTime.update({
        time: time,
        name: name,
        phone: phone
    });
}

async function createNewPickupTime(userId, time, name, phone) {
    await PickupTime.create({
        user_id: userId,
        time: time,
        name: name,
        phone: phone
    });
}

function convertToFormattedTime(pickup_time) {
    const timeParts = pickup_time.split(':');
    let hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);

    if (pickup_time.includes('PM') && hours !== 12) {
        hours += 12;
    } else if (pickup_time.includes('AM') && hours === 12) {
        hours = 0;
    }

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
}


module.exports = router;