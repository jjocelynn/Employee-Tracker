SELECT employee.id AS employeeId, employee.manager_id AS managerId
FROM employee
INNER JOIN employee
ON employee.id = employee.manager_id;