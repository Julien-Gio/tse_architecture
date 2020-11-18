const express = require('express');
const model_users = require('../models/model_users');

const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('signup', { title: 'Création de compte' });
});

router.post('/insert', function(req, res, next) {
    let data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        promo: req.body.promo,
        account_type: req.body.account_type
    };
    
    let error = model_users.create_user(data.firstname, data.lastname, "", data.account_type, data.promo);

    if (error == "valid") {
        res.render('signup_success', { title: 'Compte crée'});
    } else {
        res.render('signup_failure', { title: 'Erreur.', error_str: error});
    }
});


module.exports = router;