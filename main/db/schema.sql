-- creating database
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

-- using created database
USE employee_db;

-- creating department, role, and employee tables
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT REFERENCES role(id),
    manager_id INT REFERENCES employee(id)
);
