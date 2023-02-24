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
        this.tableTemplate(`SELECT e1.id, e1.first_name AS "first name", e1.last_name AS "last name", role.title AS "job title", department.name AS department, role.salary, e2.first_name AS manager FROM employee e1 LEFT JOIN role ON e1.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee e2 ON e2.id = e1.manager_id;`, 'employee');
    }



    //ADD/EDIT

    // template to add/update code
    alterTemplate(sqlCode, errorMessage, successMessage) {
        db.query(sqlCode, (err, results) => {
            if (err) {
                return console.log(errorMessage + "\n\n" + err);
            } else {
                return console.log("\n" + successMessage + "\n\n");
            }
        })
    }

    //add a department
    addDepartment(name) {
        this.alterTemplate(`INSERT INTO department (name) VALUES("${name}");`, 'Error in adding department name', 'Successfully added department!')
    }
    //add a role
    ///////////////need to find out how to translate user answer into int to match character type
    addRole(title, salary, department) {
        this.alterTemplate(`INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${department}");`, 'Error in adding role', 'Successfully added role!')
    }

    //add an employee
    addEmployee(firstName, lastName, role, manager) {
        this.alterTemplate(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${role}", "${manager}");`, `Error in adding ${firstName} ${lastName}`, `Successfully added ${firstName} ${lastName}!`)
    }

    //update an employee role
}


module.exports = Render;