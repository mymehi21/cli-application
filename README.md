# Project Name

Employee Management System

## Description

The Employee Management System is a command-line application that allows you to manage departments, roles, and employees in a company. It provides functionality to view, add, and update information related to departments, roles, and employees. The application uses a MySQL database to store the data.

## Installation

1. Clone the repository to your local machine.
2. Install the required dependencies by running the following command:

```
npm install
```
3. Set up the MySQL database by executing the SQL queries provided in the `seeds.sql` file.

## Usage

To start the application, run the following command:

```
node index.js
```

The application will display a menu with various options. Use the arrow keys to navigate and press Enter to select an option.

### Options

- **View all departments**: This option displays a table showing all the departments in the company.

- **View all roles**: This option displays a table showing all the roles in the company, including the associated department and salary.

- **View all employees**: This option displays a table showing all the employees in the company, including their role, department, salary, and manager.

- **Add a department**: This option allows you to add a new department to the database. You will be prompted to enter the department name.

- **Add a role**: This option allows you to add a new role to the database. You will be prompted to enter the role name, salary, and select the department to which the role belongs.

- **Add an employee**: This option allows you to add a new employee to the database. You will be prompted to enter the employee's first name, last name, select their role, and choose their manager (if applicable).

- **Update an employee role**: This option allows you to update the role of an existing employee. You will be prompted to select the employee and choose the new role.

- **Exit**: Selecting this option will exit the application.

## Database Configuration

The application uses a MySQL database to store the data. The database configuration can be found in the `db.js` file. By default, the configuration is set as follows:

``` javascript
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
});
```

You can modify these settings according to your MySQL configuration.

## Dependencies

This project uses the following dependencies:

- `cli-table3`: A utility for rendering tables in the command line.
- `inquirer`: A powerful command-line interface for user interactions.
- `mysql2`: A MySQL client for Node.js.

You can install the dependencies by running the following command:
```
npm install
```

## License

This project is licensed under the [MIT license](LICENSE).