#  Employee Tracker

## Description ![MIT badge](https://img.shields.io/badge/License-MIT-brightgreen)

This employee tracker is designed for business owners who want to view and manage departments, roles, and employees within their company. Using inquirer, the user is able to interact with the command line to view, add or edit information.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [questions](#questions)

## Installation

1. Navigate to the main folder
2. Run "npm i" to install necessary packages 
3. Create a .env file and follow the .env.EXAMPLE format with your sql information.

## Usage

1. Open the terminal and navigate to the db folder in main. 
2. Enter "mysql -u root -p" and fill in your password 
3. Enter the following lines "source schema.sql;" and "source seeds.sql;" 
4. Exit mysql using "quit"
5. Go back to the main folder and enter "node index.js" to start the application
6. Use the up and down keys to choose an option and follow the prompts
7. To choose another action, use the up or down keys to select again. 
8. To exit, simply choose the "quit" option or press Ctrl + c

## License

Please refer to the LICENSE in the repo

## Questions

Check out my GitHub here: https://github.com/jjocelynn