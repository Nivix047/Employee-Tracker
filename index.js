// npm i inquirer@8.2 // newest inquirer does not work with vsc
// npm i console.table
// npm i mysql2
const inquirer = require("inquirer");
const db = require("./db/connection");
require("console.table");
const utils = require("util");
db.query = utils.promisify(db.query);
const logo = require("asciiart-logo");

init();

// Display logo text, load main prompts
function init() {
  const logoText = logo({ name: "Employee Manager" }).render();

  console.log(logoText);
}

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

// Show employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
function viewAllEmployees() {}

// Prompt the enter the employee's first name, last name, role, and manager, and that employee is added to the database
function addEmployees() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?",
      },
    ])
    .then((answer) => {
      let firstName = answer.first_name;
      let lastName = answer.last_name;
      db.query("SELECT role.id, role.title FROM role").then((result, err) => {
        if (err) console.error(err);
        const roleChoices = result.map(({ id, title }) => ({
          value: id,
          name: title,
        }));
        inquirer
          .prompt([
            {
              type: "list",
              name: "role",
              message: "What is the role of the employee",
              choices: roleChoices,
            },
          ])
          .then((answer) => {
            const roleChoice = answer.role;
            db.query(
              "SELECT employee.first_name, employee.last_name, employee.id FROM employee"
            ).then((result, err) => {
              if (err) console.error(err);
              const employee = result.map(({ id, first_name, last_name }) => ({
                value: id,
                name: `${first_name} ${last_name}`,
              }));
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "manager",
                    message: "Who is the employee's manager",
                    choices: employee,
                  },
                ])
                .then((answer) => {
                  db.query(
                    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
                    [firstName, lastName, roleChoice, answer.manager]
                  ).then((result, err) => {
                    if (err) console.error(err);
                    console.log("Added new employee");
                    startApp();
                  });
                });
            });
          });
      });
    });
}

// Prompt to select an employee to update and their new role and this information is updated in the database
function updateEmployee() {
  db.query("SELECT * FROM employee").then((result, err) => {
    if (err) console.log(err);
    const employee = result.map(({ id, first_name, last_name }) => ({
      value: id,
      name: `${first_name} ${last_name}`,
    }));
    console.log("----const employee----");
    console.log(employee);
    inquirer
      .prompt([
        {
          type: "list",
          name: "employee_id",
          message: "Which employee would you like to update?",
          choices: employee,
        },
      ])
      .then((answer) => {
        console.log(answer);
        let employeeID = answer.employee_id;
        db.query("SELECT role.id, role.title FROM role").then((result, err) => {
          if (err) console.log(err);
          const roleChoices = result.map(({ id, title }) => ({
            value: id,
            name: title,
          }));
          console.log("----const roleChoices----");
          console.log(roleChoices);
          inquirer
            .prompt([
              {
                type: "list",
                name: "role_id",
                message: "Which role would you like to update?",
                choices: roleChoices,
              },
            ])
            .then((answer) => {
              console.log(employeeID);
              console.log(answer.role_id);
              db.query(
                "UPDATE employee SET role_id = ? WHERE id = ?",
                [answer.role_id, employeeID],
                (err, result) => {
                  if (err) console.log(err);
                  console.log("Employee updated");
                  startApp();
                }
              );
            });
        });
      });
  });
}

// Show job title, role id, the department that role belong to, and the salary for that role
function viewRoles() {
  db.query(
    "SELECT role.id, role.title, role.salary, department.name FROM role LEFT JOIN department ON role.department_id = department.id"
  ).then((result, err) => {
    if (err) console.error(err);
    console.table(result);
    startApp();
  });
}

// Prompt to enter the name, salary, and department for the role and that role is added to the database
function addRole() {}

// Show department names and department ids
function viewDept() {
  db.query("SELECT * FROM department").then((result, err) => {
    if (err) console.error(err);
    console.table(result);
    startApp();
  });
}

// Prompt to enter the name of the department and that department is added to the database
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "new_department",
        message: "What is the name of the department?",
      },
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO department (name) VALUES (?)",
        answer.new_department
      ).then((result, err) => {
        if (err) console.error(err);
        startApp();
      });
    });
}

startApp();
