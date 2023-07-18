const inquirer = require("inquirer");
const db = require("./db");
const {
  showAllDepartments,
  showAllRoles,
  showAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployee,
} = require("./utils/functions");

const choices = [
  "View all departments",
  "View all roles",
  "View all employees",
  "Add a department",
  "Add a role",
  "Add an employee",
  "Update an employee role",
  "Exit",
];

const menu = async () => {
  const answers = await new Promise((resolve) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "choice",
          message: "Select an option:",
          choices: choices,
        },
      ])
      .then((answers) => {
        resolve(answers);
      });
  });

  switch (answers.choice) {
    case choices[0]:
      await showAllDepartments();
      await menu();
      break;
    case choices[1]:
      await showAllRoles();
      await menu();
      break;
    case choices[2]:
      await showAllEmployees();
      await menu();
      break;
    case choices[3]:
      await addDepartment();
      break;
    case choices[4]:
      await addRole();
      break;
    case choices[5]:
      await addEmployee();
      break;
    case choices[6]:
      await updateEmployee();
      break;
    case choices[7]:
      return;
  }
};

menu();
