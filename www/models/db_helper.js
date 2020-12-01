// Contains helper functions for the model files
const db_con = require('./db_connection').makeDb();


const does_user_exist_by_names = async (firstname, lastname) => {
    let out = false;
    
    try {
        let res = await db_con.query("SELECT * FROM Users WHERE firstname = '" + firstname + "' AND lastname = '" + lastname + "';");
        if (res.length == 0) {
            out = false;
        } else {
            out = true;
        }
    } catch(err) {
        console.error(err);
    }

    return out;
}


const does_user_exist_by_id = async (user_id) => {
    let out = false;
    
    try {
        let res = await db_con.query("SELECT * FROM Users WHERE uid = " + user_id + ";");
        if (res.length == 0) {
            out = false;
        } else {
            out = true;
        }
    } catch(err) {
        console.error(err);
    }

    return out;
}


const does_promo_exist = async (promo_name) => {
    let out = true;
    try {
        let res = await db_con.query("SELECT * FROM Promos WHERE name = '" + promo_name + "';");
        if (res.length == 0) {
            out = false;
        } else {
            out = true;
        }
    } catch (err) {
        console.error(err);
    }
    return out;
}


const get_promo_id_by_name = async (promo_name) => {
    // Returns the id of the promo.
    // Returns -1 if no matching name was found.
    let out = -1;

    try {
        let res = await db_con.query("SELECT id_promo FROM Promos WHERE name = '" + promo_name + "';");
        if (res.length == 0) {
            out = -1;
        } else {
            out = res[0].id_promo;
        }
    } catch (err) {
        throw err;
    }
    
    return out;
}


const get_user_account_type_by_id = async (user_id) => {
    // Returns 'admin' or 'student'.
    // Returns -1 if no matching name was found.
    let out = -1;

    try {
        let res = await db_con.query("SELECT role FROM Users WHERE uid = '" + user_id + "';");
        if (res.length == 0) {
            out = -1;
        } else {
            out = res[0].role;
        }
    } catch (err) {
        throw err;
    }
    
    return out;
}


module.exports = {
    does_user_exist_by_names,
    does_user_exist_by_id,
    does_promo_exist,
    get_promo_id_by_name,
    get_user_account_type_by_id,
}