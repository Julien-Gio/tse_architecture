const express = require('express');
const db = require('../models/db');

const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('signup', { title: 'Création de compte' });
});

router.post('/insert', function(req, res, next) {
    let data = {
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        promo: req.body.promo,
        account_type: req.body.account_type
    };

    console.log(data);
    
    // Check if the account creation is valid
    // (1) Make sure that all the feilds are valid
    // (2) Make sure the user doesn't already exist
    let valid_data = true;

    // (1)
    if (
        data.first_name == ""
        || data.last_name == "" 
        || data.promo == "" 
        || data.account_type == "" 
    ) {
        valid_data = false;
    }
    
    // (2)
    if (db.does_user_exist(data.first_name, data.last_name)) {
        valid_data = false;
    }

    if (valid_data) {
        res.render('signup_success', { title: 'Compte crée'});
    } else {
        // TODO
    }
});


module.exports = router;