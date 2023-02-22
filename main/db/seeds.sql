INSERT INTO department (id, name)
VALUES (1, 'Production'),
       (2, 'Management');

INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'Designer', 75000, 1),
       (2, 'Manufacturer', 57000, 1),
       (3, 'Supervisor', 65000, 2),
       (4, 'Manager', 91000, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Emma', 'Lee',1,3),
       (2, 'Manny', 'Quin',2,6),
       (3, 'Paige', 'Turner',3,4),
       (4, 'Robin', 'Banks',4,null),
       (5, 'Dan', 'Druff',2,6),
       (6, 'Holly', 'Day',3,4);