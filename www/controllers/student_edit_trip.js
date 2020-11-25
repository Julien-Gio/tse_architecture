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
        res.render('student_edit_trip', { 
            mode_create: req.query.create,
        });
    // }
});


module.exports = router;