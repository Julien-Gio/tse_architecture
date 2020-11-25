const express = require('express');
const model_users = require('../models/model_users');
const model_trips = require('../models/model_trips');

const router = express.Router();

router.get('/', async function(req, res) {
    if (req.session.user_id === -1 || req.session.user_id === undefined) {
        // Not logged in, redirect to login page (aka index)
        res.redirect('/');
    } else {
        try {
            let trip_data = await model_trips.get_trips_by_user_id(req.session.user_id);
            res.render('student_home', { 
                firstname: await model_users.get_user_firstname_by_id(req.session.user_id),
                trips: trip_data
            });
        } catch (err) {
            console.error(err);
        }
    }
});


module.exports = router;