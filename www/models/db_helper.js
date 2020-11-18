// Contains helper functions for the model files

require('./db_connection');


// TODO DELETE THIS. ITS USELESS
// const get_student_count = () => {
//     let out = 0;
//     db_con.query("SELECT COUNT(*) AS c FROM Users WHERE role = 'student';", function(err, result, _feilds) {
//         if (err) throw err;
//         out = result[0].c;
//     })
//     return out; 
// }

const does_user_exist = (firstname, lastname) => {
    let out = true;

    db_con.query("SELECT * FROM Users WHERE firstname = '" + firstname + "' AND lastname = '" + lastname + "';", function(err, result, _feilds) {
        if (err) throw err;
        if (len(result) == 0) {
            out = false;
        } else {
            out = true;
        }
    })

    return out;
}

const does_promo_exist = (promoname) => {
    let out = true;

    db_con.query("SELECT * FROM Promos WHERE name = '" + promoname + "';", function(err, result, _feilds) {
        if (err) throw err;
        if (len(result) == 0) {
            out = false;
        } else {
            out = true;
        }
    })

    return out;
}


module.exports = {
    does_user_exist,
    does_promo_exist
}