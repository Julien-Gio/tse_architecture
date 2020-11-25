const express = require('express');
const model_users = require('../models/model_users');

const router = express.Router();

router.get('/', async function(req, res) {
    if (req.session.user_id === -1) {
        // Not logged in, redirect to login page (aka index)
        res.redirect('./');
    } else {
        try {
            res.render('student_home', { firstname: await model_users.get_user_firstname_by_id(req.session.user_id) });
        } catch (err) {
            console.error(err);
        }
    }
});


module.exports = router;