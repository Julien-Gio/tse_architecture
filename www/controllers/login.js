var express = require('express');
const model_users = require('../models/model_users');

var router = express.Router();


router.post('/', async function(req, res) {
  output = "";
  output += req.body.username + " " + req.body.pswd
  console.log("Logging in as", output);

  // Extract firstname and lastname from username. The front already verified the format of the username
  let lastname  = req.body.username.split('.')[0];
  let firstname = req.body.username.split('.')[1];
  
  try {
    // Check if user exists
    if (await model_users.does_user_exist_by_names(firstname, lastname)) {  
      let uid = await model_users.get_user_id_by_name(firstname, lastname);
      let role = await model_users.get_user_role(uid);
      
      // Redirect
      if (role == "admin") {
        // Create session
        req.session.user_id = uid;
        res.redirect("./admin");
      } else if (role == "student") {
        // Create session
        req.session.user_id = uid;
        res.redirect("./student");
      } else {
        throw new Error("Cannot find role of user id " + uid);
      }

    } else {
      // Invalid username
      res.redirect('./?invalid=1');
    }

  } catch (err) {
    console.error(err);
    // Some error prevented us from logging in
    res.redirect('./?error=1');
  }

});


module.exports = router;