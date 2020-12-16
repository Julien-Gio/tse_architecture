const util = require('util');
const mysql = require('mysql');

// const db_con = mysql.createConnection({
//     host: "localhost",
//     user: "site_user",
//     password: "tseinfo42",
//     database: "architecture"
// });

// db_con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected to db 'architecture'!");
// });


function makeDb() {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "site_user",
    password: "tseinfo42",
    database: "architecture",
    timezone : "+00:00"
  });
  
  return {
    query(sql, args) {
      return util.promisify(connection.query)
        .call(connection, sql, args);
    },
    close() {
      return util.promisify(connection.end).call(connection);
    }
  };
}


module.exports = {
  makeDb
}