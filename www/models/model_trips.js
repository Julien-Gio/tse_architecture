const db_helper = require('./db_helper');
const db_con = require("./db_connection").makeDb();



create_trip = async () => {
    // TODO
}


get_trips_by_user_id = async (user_id) => {
    let out = [];
    try {
        let res = db_con.query("SELECT * FROM Trips WHERE user_id = " + user_id + ";");
        out = res
    } catch (err) {
        console.error(err);
    }

    return out;
}


module.exports = {
    create_trip,
    get_trips_by_user_id,
}