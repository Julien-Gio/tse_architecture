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
            trip_data = JSON.parse(JSON.stringify(trip_data));
            
            // Determiner si chaque voyage est à venir, en cours ou terminé.
            trip_data.forEach(function(t) {
                if (Date.parse(t.start_date) > Date.now()) {
                    t.upcoming = true;
                } else if (Date.parse(t.end_date) < Date.now()) {
                    t.past = true;
                } else {
                    t.current = true;
                }
            });

            let user_data = await model_users.get_user_by_id(req.session.user_id);
            user_data = JSON.parse(JSON.stringify(user_data));
            user_data.firstname = user_data.firstname.charAt(0).toUpperCase() + user_data.firstname.slice(1);
            user_data.lastname  = user_data.lastname .charAt(0).toUpperCase() + user_data.lastname .slice(1);
            
            res.render('student_home', { 
                user_data: user_data,
                trips: trip_data
            });
        } catch (err) {
            console.error(err);
        }
    }
});


module.exports = router;