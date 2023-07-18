const connection = require("../db");
var Table = require("cli-table3");
const inquirer = require("inquirer");

const showAllDepartments = async () => {
  try {
    const sql = "SELECT * FROM department";
    const result = await connection.promise().query(sql);

    const departments = result[0];

    // showing tables
    var table = new Table({
      head: ["ID", "Department name"],
    });

    departments.forEach((dept) => {
      table.push([dept.id, dept.name]);
    });

    console.log(table.toString());
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const showAllRoles = async () => {
  try {
    const sql =
      "SELECT role.id, role.title, department.name, role.salary FROM role, department WHERE role.department_id = department.id;";
    const result = await connection.promise().query(sql);

    const role = result[0];

    // showing tables
    var table = new Table({
      head: ["ID", "Title", "Department", "Salary"],
    });

    role.forEach((r) => {
      table.push([r.id, r.title, r.name, r.salary]);
    });

    console.log(table.toString());
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const showAllEmployees = async () => {
  try {
    const sql =
      "SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id;";
    const result = await connection.promise().query(sql);

    const employees = result[0];

    // showing tables
    var table = new Table({
      head: [
        "ID",
        "First name",
        "Last name",
        "Role",
        "Department",
        "Salary",
        "Manager",
      ],
    });

    employees.forEach((emp) => {
      table.push([
        emp.id,
        emp.first_name,
        emp.last_name,
        emp.title,
        emp.department,
        emp.salary,
        emp.manager_name || "NULL",
      ]);
    });
    console.log(table.toString());
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const addDepartment = async () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "Enter the department name:",
      },
    ])
    .then(async (answers) => {
      const { department } = answers;

      const sql = `INSERT INTO department VALUES(0,"${department}");`;

      const result = await connection.promise().query(sql);

      if (result) {
        console.log(`${department} added to database`);
      } else return;
    });
};

const addRole = async () => {
  const sql = "SELECT * FROM department";
  const result = await connection.promise().query(sql);

  const departments = result[0];

  const choices = [];

  departments.map((data) => choices.push(data.name));
  inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "What is the name of the role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the role?",
      },
      {
        type: "list",
        name: "option",
        message: "What is the salary of the role?",
        choices: choices,
      },
    ])
    .then(async (answers) => {
      const { role, salary, option } = answers;

      const dep_id = departments.find((x) => x.name === option).id;

      const sql = `INSERT INTO role VALUES(0,"${role}","${salary}",${dep_id});`;
      const result = await connection.promise().query(sql);
      if (result) {
        console.log(`Added ${role} to the database`);
      } else return;
    });
};

const addEmployee = async () => {
  const role_sql = "SELECT * FROM role";
  const role_result = await connection.promise().query(role_sql);
  const role = role_result[0];
  const role_choices = [];

  const mgr_sql = "select * from employee;";
  const mgr_result = await connection.promise().query(mgr_sql);
  const mgr = mgr_result[0];
  const mgr_choices = ["None"];

  role.map((data) => role_choices.push(data.title));
  mgr.map((data) => mgr_choices.push(`${data.first_name} ${data.last_name}`));

  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "First name of employee: ",
      },
      {
        type: "input",
        name: "second_name",
        message: "Second name of employee: ",
      },
      {
        type: "list",
        name: "role",
        message: "What is the role of the employee",
        choices: role_choices,
      },
      {
        type: "list",
        name: "manager",
        message: "Manager of the employee",
        choices: mgr_choices,
      },
    ])
    .then(async (answers) => {
      const { first_name, second_name, manager } = answers;
      const role_optiton = answers.role;

      const rol_id = role.find((x) => x.title === role_optiton).id;

      const [firstName, lastName] = manager.split(" ");
      const foundManager = mgr.find(
        (x) => x.first_name === firstName && x.last_name === lastName
      );

      if (foundManager) {
        var mgr_id = foundManager.id;
      } else {
        mgr_id = null;
      }

      const sql = `INSERT INTO employee VALUES(0,"${first_name}","${second_name}",${rol_id},${mgr_id});`;
      const result = await connection.promise().query(sql);
      if (result) {
        console.log(`Added ${first_name} ${second_name} to the database`);
      } else return;
    });
};

const updateEmployee = async () => {
  const sql = "select first_name,last_name,role_id from employee";
  const emp_result = await connection.promise().query(sql);
  const emp = emp_result[0];
  const emp_choices = [];

  const role_sql = "SELECT * FROM role";
  const role_result = await connection.promise().query(role_sql);
  const role = role_result[0];
  const role_choices = [];

  role.map((data) => role_choices.push(data.title));
  emp.map((data) => emp_choices.push(`${data.first_name} ${data.last_name}`));

  inquirer
    .prompt([
      {
        type: "list",
        name: "emp_name",
        message: "Which employee do you want to update?",
        choices: emp_choices,
      },
      {
        type: "list",
        name: "new_role",
        message: "Which role do you want to assign to the selected employee?",
        choices: role_choices,
      },
    ])
    .then(async (answers) => {
      const { new_role, emp_name } = answers;
      const rol_id = role.find((x) => x.title === new_role).id;

      const sql = `UPDATE employee SET role_id=${rol_id} WHERE first_name = "${
        emp_name.split(" ")[0]
      }" AND last_name = "${emp_name.split(" ")[1]}";`;

      const result = await connection.promise().query(sql);
      if (result) {
        console.log("Employee details updated");
      } else return;
    });
};

module.exports = {
  showAllDepartments,
  showAllRoles,
  showAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployee,
};
