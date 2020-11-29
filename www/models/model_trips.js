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
    if (user_id === undefined || display_name === undefined || city_name === undefined || country_name === undefined || start_date === undefined || end_date === undefined) {
        out = "Some data was undefined : user_id:" + user_id + " name:" + display_name + " city:" + city_name + " country:" + country_name + " start_date:" + start_date + " end_date:" + end_date;
    }
    else if (display_name == "" || city_name == "" || country_name == "" || start_date == "" || end_date == "") {
        out = "Incomplete data";
    } else if (await db_helper.does_user_exist_by_id(user_id) == false) {
        out = "User not found (uid passed: '" + user_id + "')";
    } else if (Date.parse(start_date) == NaN || Date.parse(end_date) == NaN) {
        out = "Date format invalid (received: " + start_date + " and " + end_date + ")";
    }

    // (2)
    if (out == "valid" && Date.parse(start_date) > Date.parse(end_date)) {
        out = "Invalid dates, start_date cannot be after end_date";
    } 

    // (3)
    if (out == "valid") {
        try {
            let res =  await db_con.query("SELECT * FROM Trips WHERE user_id = " + user_id + " AND display_name = '" + display_name + "';");
            if (res.length != 0) {
                out = "User " + user_id + " already has a trip named " + display_name;
            }
        } catch (err) {
            out = "Error when checking if trip already exists (" + err.message + ")";
        }
    }
    
    // Create the trips
    if (out == "valid") {
        try {
            // TODO
            await db_con.query("INSERT INTO Trips (user_id, display_name, city_name, country_name, start_date, end_date) VALUES" +
                                "(" + user_id + ", '" + display_name + "', '" + city_name + "', '" + country_name + "', '" + start_date + "', '" + end_date + "');");
        } catch (err) {
            console.error(err);
            out = "Unable to insert (" + user_id + ", '" + display_name + "', '" + city_name + "', '" + country_name + "', '" + start_date + "', '" + end_date + "')";
        }
    }

    return out;
}


get_trips_by_user_id = async (user_id) => {
    let out = [];
    try {
        let res = db_con.query("SELECT * FROM Trips WHERE user_id = " + user_id + " ORDER BY start_date;");
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
            console.log(out);
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