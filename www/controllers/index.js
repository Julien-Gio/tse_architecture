var express = require('express');
var router = express.Router();
const model_users = require('../models/model_users');


/* GET home page. */
router.get('/', async function(req, res) {
  if (!req.session.user_id || req.query.disconnect) {
    req.session.user_id = -1;   // Not yet defined
  }
  
  if (req.session.user_id === -1) {
    // Logged out
    res.render('index', { 
      title: 'Mobilités TSE', 
      show_invalid_div : req.query.invalid,
      show_error_div : req.query.error,
      show_disconnect_div : req.query.disconnect
    });
  } else {
    try {
      // Student or admin user already logged in
      let role = await model_users.get_user_role(req.session.user_id);
      
      // Redirect
      if (role == "admin") {
        res.redirect("./admin");
      } else if (role == "student") {
        res.redirect("./student");
      } else {
        throw new Error("Cannot find role of session user " + req.session.user_id + ". Logging off.");
      }
    } catch (err) {
      console.error(err);
      req.session.user_id = -1;
      res.redirect("/?error=1");
    }
  }
});


module.exports = router;
