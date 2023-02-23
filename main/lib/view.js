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

    //VIEW ALL DATA FROM SELECTED TABLE

    //template to show tables
    tableTemplate(sqlCode, table) {
        db.query(sqlCode, (err, results) => {
            if (err) {
                return console.log('Error selecting from ' + table + "\n\n" + err);
            } else {
                console.log("\n\n\nAll " + table + "'s \n");
                return console.table(results);
            }
        })
    }
    
    //view all departments
    viewDepartmentsTable() {
        this.tableTemplate('SELECT * FROM department;', 'department');
    }

    //view all roles
    viewRolesTable() {
        this.tableTemplate(`SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id;`, 'role');
    }

    //view all employees
    viewEmployeesTable() {
        this.tableTemplate(`SELECT e1.id, e1.first_name AS "first name", e1.last_name AS "last name", role.title AS role, e2.first_name AS manager FROM employee e1 LEFT JOIN role ON e1.role_id = role.id LEFT JOIN employee e2 ON e2.id = e1.manager_id;`, 'employee');
    }

    //ADD/EDIT

    // template to add/update code
    alterTemplate(sqlCode, table) {
        db.query(sqlCode, (err, results) => {
            if (err) {
                return console.log('Error selecting from ' + table + "\n\n" + err);
            } else {
                console.log("\n\n\nAll " + table + "'s \n");
                return console.table(results);
            }
        })
    }

    //add a department

    //add a role

    //add an employee

    //update an employee role
}


module.exports = Render;