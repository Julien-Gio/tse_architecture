const express = require('express');
const model_users = require('../models/model_users');
const model_trips = require('../models/model_trips');

const router = express.Router();

router.get('/', async function(req, res) {
    // if (req.session.user_id === -1 || req.session.user_id === undefined) {
    //     // Not logged in, redirect to login page (aka index)
    //     res.redirect('/');
    // } else {
        // TODO
        let data = {};

        if (req.query.new === undefined && req.query.trip_id === undefined) {
            console.error("Invalid GET paramaters. Acting as if 'new=1'");
            req.query.new = 1;
        }

        if (!req.query.new) {
            try {
                data = await model_trips.get_trip_by_id(req.query.trip_id);
            } catch (err) {
                console.error(err);
                console.log("Trip info not found. Acting as id 'new=1");
                req.query.new = 1;
                data = {};
            }
        } 

        res.render('student_edit_trip', { 
            mode_create: req.query.new,
            trip_data: data
        });
    // }
});


router.post('/insert', async function(req, res) {
    // if (req.session.user_id === -1 || req.session.user_id === undefined) {
    //     // Not logged in, redirect to login page (aka index)
    //     res.redirect('/');
    // } else {
        try {
            let data = {
                display_name: req.body.display_name,
                city_name: req.body.city,
                country_name: req.body.country,
                start_date: req.body.date_start,
                end_date: req.body.date_end
            };
            
            let error = await model_trips.create_trip(req.session.user_id, data.display_name, data.city_name, data.country_name, data.start_date, data.end_date);
    
            if (error == "valid") {
                res.render('student_edit_trip_success', { title: 'Voyage crée'});
            } else {
                res.render('student_edit_trip_failure', { title: 'Erreur lors de la création du voyage.', error_str: error});
            }
        } catch (err) {
            console.error(err);
        }
    // }
});


router.post('/update', async function(req, res) {
    // if (req.session.user_id === -1 || req.session.user_id === undefined) {
    //     // Not logged in, redirect to login page (aka index)
    //     res.redirect('/');
    // } else {
        res.end("TODO modifier voyage.");
    // }
});

module.exports = router;