var express = require('express');
var router = express.Router();
const model_users = require('../models/model_users');


/* GET home page. */
router.get('/', function(req, res) {
  if (!req.session.user_id) {
    req.session.user_id = -1;   // Not yet defined
  }
  
  if (req.session.user_id === -1) {
    // Logged out
    res.render('index', { title: 'Mobilités TSE', show_invalid_div : req.query.invalid });
  // } else if (await model_users.get_user_account_type_by_id(req.session.user_id) === 'admin') {
  //   // Admin user already logged in
  //   res.end("<p>ADMIN TODO</p>");  TODO
  //   //res.redirect("./");
  } else {
    // Student user already logged in
    res.end("<p>STUDENT TODO</p>");
  }
});


module.exports = router;
