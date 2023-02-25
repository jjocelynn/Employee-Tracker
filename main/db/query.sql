-- showing role table with id, title, salary, and department 
SELECT role.id, role.title, role.salary, department.name AS department
FROM role
JOIN department
ON role.department_id = department.id;

-- showing employees table with id, first name, last name, job title, department, salary, and manager
SELECT e1.id, e1.first_name AS "first name", e1.last_name AS "last name", role.title AS "job title", department.name AS department, role.salary, e2.first_name AS manager
FROM employee e1
LEFT JOIN role
ON e1.role_id = role.id
LEFT JOIN department
ON role.department_id = department.id
LEFT JOIN employee e2
ON e2.id = e1.manager_id;

-- showing a table of managers id and first names 
SELECT e1.id, e1.first_name AS manager
FROM employee e1
JOIN employee e2
ON e1.id = IF (e2.role_id = 3, e2.id, NULL);

