//importing required documents
const inquirer = require('inquirer');
const Render = require('./lib/view');

class CLI {
    run() {
        inquirer.prompt([
            {
                type: "list",
                name: "options",
                message: "\n\nWhat would you like to do?:",
                choices: [
                    "view all departments",
                    "view all roles",
                    "view all employees",
                    "add a department",
                    "add a role",
                    "add an employee",
                    "update an employee role",
                    "quit"]
            }
        ])
            .then((response) => {
                const render = new Render();
                if (response.options === "view all departments") {
                    render.viewDepartmentsTable();
                    this.run();
                } else if (response.options === "view all roles") {
                    render.viewRolesTable();
                    this.run();
                } else if (response.options === "view all employees") {
                    render.viewEmployeesTable();
                    this.run();
                } else if (response.options === "add a department") {
                    return this.newDepartment()
                } else if (response.options === "add a role") {
                    return this.addRole()
                } else if (response.options === "add an employee") {
                    return this.addEmployee()
                } else if (response.options === "quit") {
                    console.log("Bye");
                    return "quit"
                }
            })
    };

    newDepartment() {
        inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "name of new department:"
            }
        ]).then((res) => {
            const render = new Render();
            render.addDepartment(res.name);
            this.run();
        })
    }
    addRole() {
        inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "name of new role:"
            },
            {
                type: "input",
                name: "salary",
                message: "salary for this position:"
            },
            {
                type: "input",
                name: "department",
                message: "which department does this role belong to?:"
            },
        ]).then((res) => {
            const render = new Render();
            render.addRole(res.title, res.salary, res.department);
            this.run();
        })
    }
    addEmployee() {
        inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "first name:"
            },
            {
                type: "input",
                name: "lastName",
                message: "last name:"
            },
            {
                type: "input",
                name: "role",
                message: "employee's role?:"
            },
            {
                type: "input",
                name: "manager",
                message: "employee's manager?:"
            },
        ]).then((res) => {
            const render = new Render();
            render.addEmployee(res.firstName, res.lastName, res.role, res.manager);

            this.run();
        })
    }
}

const cli = new CLI();
cli.run();