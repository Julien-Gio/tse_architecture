const express = require('express');
const model_users = require('../models/model_users');
const model_trips = require('../models/model_trips');

const router = express.Router();

router.get('/', async function(req, res) {
    if (req.session.user_id === -1 || req.session.user_id === undefined) {
        // Not logged in, redirect to login page (aka index)
        res.redirect('/');
    } else {
        let data = {};

        if (req.query.new === undefined && req.query.trip_id === undefined) {
            console.error("Invalid GET paramaters. Acting as if 'new=1'");
            req.query.new = 1;
        }

        if (!req.query.new) {
            try {
                req.query.new = 0;  // Make sure that 'new' is set to something
                data = await model_trips.get_trip_by_id(req.query.trip_id);
                // console.log("BEFORE:", data);
                data.start_date = data.start_date.getUTCFullYear() + "-" + (data.start_date.getUTCMonth()+1) + "-" + data.start_date.getUTCDate();
                data.end_date = data.end_date.getUTCFullYear() + "-" + (data.end_date.getUTCMonth()+1) + "-" + data.end_date.getUTCDate();
                // console.log("AFTER:", data.start_date);
            } catch (err) {
                console.error(err);
                console.log("Trip info not found. Acting as id 'new=1");
                req.query.new = 1;
                data = {};
            }
        } 

        let trips = await model_trips.get_trips_by_user_id(req.session.user_id);
        let trip_names = [];
        trips.forEach(t => {
            trip_names.push(t.display_name);
        });

        res.render('student_edit_trip', { 
            mode_create: req.query.new,
            trip_data: data,
            existing_trip_names: trip_names
        });
    }
});


router.post('/insert', async function(req, res) {
    if (req.session.user_id === -1 || req.session.user_id === undefined) {
        // Not logged in, redirect to login page (aka index)
        res.redirect('/');
    } else {
        try {
            let data = {
                display_name: req.body.trip_name,
                city_name: req.body.city,
                country_name: req.body.country,
                start_date: req.body.start,
                end_date: req.body.end
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
    }
});


router.post('/update', async function(req, res) {
    if (req.session.user_id === -1 || req.session.user_id === undefined) {
        // Not logged in, redirect to login page (aka index)
        res.redirect('/');
    } else {
        try {
            let data = {
                trip_id: req.body.trip_id,
                city_name: req.body.city,
                country_name: req.body.country,
                start_date: req.body.start,
                end_date: req.body.end
            };

            let error = await model_trips.update_trip(data.trip_id, data.city_name, data.country_name, data.start_date, data.end_date);
    
            if (error == "valid") {
                res.render('student_edit_trip_success', { title: 'Voyage modifié' });
            } else {
                res.render('student_edit_trip_failure', { title: 'Erreur lors de la modification du voyage.', error_str: error });
            }
        } catch (err) {
            console.error(err);
        }
    }
});


router.post('/delete', async function(req, res) {
    if (req.session.user_id === -1 || req.session.user_id === undefined) {
        // Not logged in, redirect to login page (aka index)
        res.redirect('/');
    } else {
        try {
            let data = {
                trip_id: req.body.trip_id,
            };
            console.log(data);
            console.log(req.body);
            let response = await model_trips.delete_trip(data.trip_id);
    
            if (response == "valid") {
                res.render('student_edit_trip_success', { title: 'Voyage supprimé'});
            } else {
                res.render('student_edit_trip_failure', { title: 'Erreur lors de la suppersion du voyage.', error_str: response});
            }
        } catch (err) {
            console.error(err);
        }
    }
});

module.exports = router;