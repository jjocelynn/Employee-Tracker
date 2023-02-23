//importing required documents
const inquirer = require('inquirer');
const Render = require('./view');

class CLI {
    run() {
        inquirer.prompt([
            {
                type: "list",
                name: "options",
                message: "\nWhat would you like to do?:",
                choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "quit"]
            }
        ])
            .then(async(response) => {
                const render = new Render();
                const questions = (response) => {
                    if (response.options === "view all departments") {
                        render.viewAll("department");
                    } else if (response.options === "view all roles") {
                        render.viewAll("role");
                    } else if (response.options === "view all employees") {
                        render.viewAll("employee");
                    };
                    return console.log('Repeat?');
                };
                const repeat = (response) => {
                    if (response.options === "quit") {
                        return console.log("Bye");
                    } else {
                        return this.run();
                    }
                };
                questions(await response);
                repeat(await response);
            })
    }
}

module.exports = CLI;