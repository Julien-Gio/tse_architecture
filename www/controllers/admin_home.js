const express = require('express');
const model_users = require('../models/model_users');
const model_trips = require('../models/model_trips');

const router = express.Router();

router.get('/', async function(req, res) {
    if (req.session.user_id === -1 || req.session.user_id === undefined) {
        // Not logged in, redirect to login page (aka index)
        res.redirect('/');
    } else {
        let role = await model_users.get_user_role(req.session.user_id);
        if (role != "admin") {
            res.redirect('/');
        } else {
            try {
                let country = req.query.country;
                let completion_status = req.query.completion_status; 
                let student_name = req.query.student_name;
                let promo = req.query.promo;
                console.log("QUERY :", req.query);

                let trip_data = await model_trips.get_trips_filtered(country, completion_status, student_name, promo);
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

                let country_count = await model_trips.get_trip_count_by_country(country, completion_status, student_name, promo);

                res.render('admin_home', {
                    user_data: user_data,
                    trips: trip_data,
                    country_count: JSON.stringify(country_count),
                    form_data: {country, completion_status, student_name, promo}
                });
            } catch (err) {
                console.error(err);
            }
        }
    }
});

module.exports = router;