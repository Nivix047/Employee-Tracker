const inquirer = require("inquirer");
const db = require("./db/connection");
require("console.table");
const utils = require("util");
db.query = utils.promisify(db.query);
const logo = require("asciliart-logo");

function startApp() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Quit",
        ],
      },
    ])
    .then((options) => {
      switch (options.choice) {
        case "View all departments":
          viewDept();
          break;
      }
    });
}
