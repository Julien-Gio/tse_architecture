var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  output = "";
  output += req.body.username + " " + req.body.pswd
  res.send('LOGIN PAGE TODO\n' + output)
});


module.exports = router;