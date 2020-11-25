const db_helper = require('./db_helper');
const db_con = require("./db_connection").makeDb();


create_user = async (firstname, lastname, _password, account_type, promo) => {
    // Returns "valid" if all paramaters are ok for an account creation
    // 'password' is ignored in this demo

    // Check if the account creation is valid
    // (1) Make sure that all the feilds are valid
    // (2) Make sure the user doesn't already exist
    let out = "valid";

    // (1)
    if (firstname == "" || lastname == "" || account_type == "" || promo == "") {
        out = "Incomplete data";
    } else if (account_type != "student" && account_type != "admin") {
        out = "Account type data invalid (value passed: '" + account_type + "')";
    } else if (await db_helper.does_promo_exist(promo) == false) {
        out = "Promo data invalid (value passed: '" + promo + "')";
    }
    // (2)
    if (out == "valid" && await db_helper.does_user_exist(firstname, lastname)) {
        out = "User " + firstname + " " + lastname + " already exists";
    }
    

    // Create the account
    if (out == "valid") {
        try {
            let promo_id = await db_helper.get_promo_id_by_name(promo);
            await db_con.query("INSERT INTO Users (lastname, firstname, role, id_promo) VALUES " +
                               "('" + lastname + "', '" + firstname + "', '" + account_type + "', " + promo_id + ");");
        } catch (err) {
            console.error(err);
            out = "Unable to insert (" + + lastname + "', '" + firstname + "', '" + account_type + "', " + promo_id + ")";
        }
    }

    return out;
}


does_user_exist = async (firstname, lastname) => {
    // Returns true or false
    return await db_helper.does_user_exist(firstname, lastname);
}


get_user_firstname_by_id = async (uid) => {
    let out = "Unknown";
    try {
        let res = await db_con.query("SELECT firstname FROM Users WHERE uid = " + uid + ";");
        if (res.length > 0) {
            out = res[0].firstname;
        } else {
            throw new Error("User with id " + uid + " not found!");
        }
    } catch (err) {
        console.error(err);
    }
    
    return out;
}


get_user_id_by_name = async (firstname, lastname) => {
    let out = -1;
    try {
        let res = await db_con.query("SELECT uid FROM Users WHERE firstname = '" + firstname + "' AND lastname = '" + lastname + "';");
        if (res.length > 0) {
            out = res[0].uid;
        } else {
            console.log("Error : user " + firstname + " " + lastname + " was not found in DB.");
        }
    } catch (err) {
        console.error(err);
    }

    return out;
}


module.exports = {
    create_user,
    does_user_exist,
    get_user_firstname_by_id,
    get_user_id_by_name,
}