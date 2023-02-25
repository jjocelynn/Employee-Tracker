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
        let departments = [];

        await render.departmentList()
            .then(res => {
                departments = res;
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
            const departmentId = departments.indexOf(res.department) + 1;
            console.log(res.title + res.salary + departmentId)
            render.addRole(res.title, res.salary, departmentId);
            this.run();
        })
    }
    async addEmployee() {
        const render = new Render();
        let roles = [];
        let managerNames = [];
        let managerIds = [];

        await render.roleList()
            .then(res => {
                roles = res;
            })

        await render.managerList()
            .then(res => {
                console.log(res);
                managerNames = res.map(arr => arr.manager);
                managerNames.push("Has no manager");
                managerIds = res.map(arr => arr.id);
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
                choices: managerNames
            },
        ]).then((res) => {
            const role = roles.indexOf(res.role) + 1;
            const managerIndex = "";
            let managerId;

            if (res.manager === "Has no manager") {
                managerId = null;
            } else {
                managerIndex = managerNames.indexOf(res.manager);
                managerId = managerIds[managerIndex];
            }

            render.addEmployee(res.firstName, res.lastName, role, managerId);
            this.run();
        })
    }
}

const cli = new CLI();
cli.run();