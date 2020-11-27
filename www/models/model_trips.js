const db_helper = require('./db_helper');
const db_con = require("./db_connection").makeDb();



create_trip = async (user_id, display_name, city_name, country_name, start_date, end_date) => {
    // Returns "valid" if all paramaters are ok for an account creation

    // Check if the account creation is valid
    // (1) Make sure that all the feilds are valid inputs
    // (2) Verify that start_date is before end_date
    // (3) Make sure the trip name is unique for this user
    let out = "valid";

    // (1)
    if (display_name == "" || city_name == "" || country_name == "") {
        out = "Incomplete data";
    } else if (await db_helper.does_user_exist_by_id(user_id) == false) {
        out = "User not found (uid passed: '" + user_id + "')";
    }
    // (2)
    // TODO

    // (3)
    if (out == "valid") {
        try {
            let res =  await db_con.query("");
            if (res.length != 0) {
                out = "User " + firstname + " " + lastname + " already exists";
            }
        } catch (err) {
            out = "Error when checking if trip already exists (" + err.message + ")";
        }
    }
    

    // Create the trips
    if (out == "valid") {
        try {
            // TODO
            // await db_con.query("INSERT INTO Users (lastname, firstname, role, id_promo) VALUES " +
            //                    "('" + lastname + "', '" + firstname + "', '" + account_type + "', " + promo_id + ");");
        } catch (err) {
            console.error(err);
            // out = "Unable to insert (" + + lastname + "', '" + firstname + "', '" + account_type + "', " + promo_id + ")";
        }
    }

    return out;
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

get_trip_by_id = async (trip_id) => {
    let out = {};
    try {
        let res = await db_con.query("SELECT * FROM Trips WHERE trip_id = " + trip_id + ";");
        if (res.length > 0) {
            out = res[0];
        } else {
            throw new Error("Trip with id " + trip_id + " not found!");
        }
    } catch (err) {
        console.error(err);
    }

    return out;
}


module.exports = {
    create_trip,
    get_trips_by_user_id,
    get_trip_by_id,
}