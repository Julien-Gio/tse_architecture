const db_con = require('./db_connection');
const db_helper = require('./db_helper')
require('./db_connection');  // defines 'db_con'

create_user = (firstname, lastname, _password, account_type, promo) => {
    // Returns "valid" if all paramaters are ok for an account creation
    // 'password' is ignored in this demo

    // Check if the account creation is valid
    // (1) Make sure that all the feilds are valid
    // (2) Make sure the user doesn't already exist
    let out = "valid";

    // (1)
    if (firstname == "" || lastname == "" || account_type == "" || promo == "") {
        out = "Incomplete data";
    } else if (account_type != "student" || account_type != "admin") {
        out = "Account type data invalid";
    } else if (db_helper.does_user_exist(promo) == false) {
        out = "Promo data invalid";
    }
    // (2)
    if (out == "valid" && db_helper.does_user_exist(firstname, lastname)) {
        out = "User " + firstname + " " + lastname + " already exists";
    }
    

    // Create the account
    if (out == "valid") {
        db_con.query("INSERT")
    }

    return out;
}


module.exports = {
    create_user
}