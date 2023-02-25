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
    async addRole() {
        const render = new Render();
        let departments=[];

        await render.departmentList()
            .then(res => {
                departments= res;
            })

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
                type: "list",
                name: "department",
                message: "which department does this role belong to?:",
                choices: departments
            },
        ]).then((res) => {
            const departmentIndex = departments.indexOf(res.department)
            render.addRole(res.title, res.salary, departmentIndex);
            this.run();
        })
    }
    async addEmployee() {
        const render = new Render();
        let roles = [];
        let managers = [];

        await render.departmentList()
            .then(res => {
                roles = res;
            })

        await render.managerList()
            .then(res => {
                managers = res;
            })

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
                type: "list",
                name: "role",
                message: "employee's role?:",
                choices: roles
            },
            {
                type: "list",
                name: "manager",
                message: "employee's manager?:",
                choices: managers
            },
        ]).then((res) => {
            const role = roles.indexOf(res.role);
           // const manager = roles.indexOf(res.role);

            render.addEmployee(res.firstName, res.lastName, role, 1);
            this.run();
        })
    }
}

const cli = new CLI();
cli.run();