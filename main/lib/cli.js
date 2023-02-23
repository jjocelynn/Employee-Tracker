//importing required documents
const inquirer = require('inquirer');
const Render = require('./view');

class CLI {
    run() {
        inquirer.prompt([
            {
                type: "list",
                name: "options",
                message: "\n\nWhat would you like to do?:",
                choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "quit"]
            }
        ])
            .then((response) => {
                const render = new Render();
                if (response.options === "view all departments") {
                    render.viewAll("department");
                } else if (response.options === "view all roles") {
                    render.viewAll("role");
                } else if (response.options === "view all employees") {
                    render.viewAll("employee");
                };

                if (response.options === "quit") {
                    return console.log("Bye");
                } else {
                    return this.run();
                }
            });
    };
}


module.exports = CLI;