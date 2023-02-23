INSERT INTO department (name)
VALUES ('Production'),
       ('Management');

INSERT INTO role (title, salary, department_id)
VALUES ('Designer', 75000, 1),
       ('Manufacturer', 57000, 1),
       ('Supervisor', 65000, 2),
       ('Manager', 91000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Emma', 'Lee',1,3),
       ('Manny', 'Quin',2,6),
       ('Paige', 'Turner',3,4),
       ('Robin', 'Banks',4,null),
       ('Dan', 'Druff',2,6),
       ('Holly', 'Day',3,4);