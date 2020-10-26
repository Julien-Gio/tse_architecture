var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('signup', { title: 'Création de compte' });
});

router.post('/insert', function(req, res, next) {
    var data = {
        "first_name" : req.body.firstname,
        "second_name" : req.body.lastname,
        "promo" : req.body.promo,
        "student": req.body.student,
        "admin" : req.body.admin,
    };

    console.log(data);
    
    res.render('signup_success', { title: 'Compte crée'});
});


module.exports = router;