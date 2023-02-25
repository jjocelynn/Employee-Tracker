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

    /////////VIEW ALL DATA FROM SELECTED TABLE//////////

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



    //////////ADD infromation to table//////////

    // template to add information
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
    addRole(title, salary, department) {
        this.alterTemplate(`INSERT INTO role (title, salary, department_id) VALUES ("${title}", ${salary}, ${department});`, 'Error in adding role', 'Successfully added role!')
    }

    //add an employee
    addEmployee(firstName, lastName, role, manager) {
        this.alterTemplate(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", ${role}, ${manager});`, `Error in adding ${firstName} ${lastName}`, `Successfully added ${firstName} ${lastName}!`)
    }


    ////////List///////
    // department list array
    async departmentList() {
        const results = await new Promise((resolve, reject) => {
            db.query("SELECT name FROM department;", (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        const departmentList = results.map(name => name.name);
        return (departmentList);
    }

    // role list array
    async roleList() {
        const results = await new Promise((resolve, reject) => {
            db.query("SELECT title FROM role;", (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        const roleList = results.map(role => role.title);
        return (roleList);
    }

    // manager list array
    async managerList() {
        const results = await new Promise((resolve, reject) => {
            db.query(`SELECT e1.id, e1.first_name AS manager FROM employee e1 JOIN employee e2 ON e1.id = IF(e2.role_id = 3, e2.id, NULL);`, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        const managerList = results.map(manager => manager.manager);
        const managerIds = results.map(id => id.id);
        return (results);
    }

    //update an employee role

//     // WHEN I choose to update an employee role
//  select an employee to update and their new role
    update(sqlCode) {
        db.query(`UPDATE employee SET`, (err, results) => {
            if (err) {
                return console.log('Error updating informatin' + err);
            } else {
                console.log("\n\n\nInformation updated successfully\n");
                return results;
            }
        })
    }

}


module.exports = Render;