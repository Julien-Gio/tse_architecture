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
      // Create session
      req.session.user_id = await model_users.get_user_id_by_name(firstname, lastname);
      
      // Redirect
      res.redirect("./student");
    } else {
      // Invalid username
      res.redirect('./?invalid=1');
    }

  } catch (err) {
    console.error(err);
  }

});


module.exports = router;