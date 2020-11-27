const express = require('express');
const model_users = require('../models/model_users');

const router = express.Router();

router.get('/', function(req, res) {
    res.render('signup', { title: 'Création de compte' });
});

router.post('/insert', async function(req, res) {
    try {
        let data = {
            firstname: req.body.firstname.toLowerCase(),
            lastname: req.body.lastname.toLowerCase(),
            promo: req.body.promo,
            account_type: req.body.account_type
        };
        
        let error = await model_users.create_user(data.firstname, data.lastname, "", data.account_type, data.promo);

        if (error == "valid") {
            res.render('signup_success', { title: 'Compte crée'});
        } else {
            res.render('signup_failure', { title: 'Erreur.', error_str: error});
        }
    } catch (err) {
        console.error(err);
    }
});


module.exports = router;