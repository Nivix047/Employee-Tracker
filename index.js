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
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
      },
    ])
    .then((options) => {
      switch (options.choice) {
        case "View All Employees":
          viewAllEmployees();
          break;

        case "Add Employee":
          addEmployees();
          break;

        case "Update Employee Role":
          updateEmployee();
          break;

        case "View All Roles":
          viewRoles();
          break;

        case "Add Role":
          addRole();
          break;

        case "View All Departments":
          viewDept();
          break;

        case "Add Department":
          addDepartment();
          break;

        default:
          process.exit();
      }
    });
}

function viewAllEmployees() {}

function addEmployees() {}

function updateEmployee() {}

function viewRoles() {}

function addRole() {}

function viewDept() {
  db.query("SELECT * FROM department").then((result, err) => {
    if (err) console.err(err);
    console.table(result);
    startApp();
  });
}
function addDepartment() {}
