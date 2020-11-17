var mysql = require('mysql');

var db_con = mysql.createConnection({
    host: "localhost",
    user: "site_user",
    password: "tseinfo42"
  });


db_con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});



module.exports = db_con;