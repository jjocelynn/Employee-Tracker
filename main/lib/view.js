const table = require('console.table');
const mysql = require('mysql2');
require('dotenv').config();

//connect to database
const db = mysql.createConnection({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
},
    console.log('connected to database \n')
);


class Render {
    //view all from ____ table
    viewAll(table) {
        db.query(`SELECT * FROM ${table};`, (err, results) => {
            if (err) {
                return console.log('Error selecting from ' + table + "\n\n" + err);
            } else {
                console.log("\n\nAll " + table + "'s");
                return console.table(results);
            }
        })
    }

    //view all roles

    //view all employees


    //ADD/EDIT

    //add a department

    //add a role

    //add an employee

    //update an employee role
}


module.exports = Render;