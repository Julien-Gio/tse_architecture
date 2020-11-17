const mysql = require('mysql');

const db_con = mysql.createConnection({
    host: "localhost",
    user: "site_user",
    password: "tseinfo42",
    database: "architecture"
  });


db_con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to db 'architecture'!");
});


module.exports = db_con;