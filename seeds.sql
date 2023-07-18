-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS empDatabase;

-- Use the empDatabase database
USE empDatabase;

-- Create the department table
CREATE TABLE IF NOT EXISTS department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
);

-- create role table
CREATE TABLE IF NOT EXISTS role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY(department_id) REFERENCES department(id)
);

-- CREATE employee table
CREATE TABLE IF NOT EXISTS employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  FOREIGN KEY(role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee (id)
)