DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;
USE employee_tracker;

DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

create TABLE role (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL
  salary DECIMAL (6, 0) NOT NULL,
  department_id INTEGER,
  FOREIGN KEY (department_id),
  REFERENCES department(id),
  ON DELETE SET NULL
);

create TABLE employee (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER NOT NULL,
  FOREIGN KEY (role_id),
  REFERENCES employee(id),
  ON DELETE SET ON NULL
);