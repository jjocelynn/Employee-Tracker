SELECT role.id, role.title, role.salary, department.name AS department
FROM role
JOIN department
ON role.department_id = department.id;

SELECT e1.id, e1.first_name AS "first name", e1.last_name AS "last name", role.title AS role, e2.first_name AS manager
FROM employee e1
LEFT JOIN role
ON e1.role_id = role.id
LEFT JOIN employee e2
ON e2.id = e1.manager_id;