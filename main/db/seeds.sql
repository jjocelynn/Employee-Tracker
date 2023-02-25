INSERT INTO department (name)
VALUES ('Production'),
       ('Management');

INSERT INTO role (title, salary, department_id)
VALUES ('Designer', 75000, 1),
       ('Manufacturer', 67000, 1),
       ('Manager', 91000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Emma', 'Lee',1,6),
       ('Manny', 'Quin',2,4),
       ('Paige', 'Turner',1,6),
       ('Robin', 'Banks',3,null),
       ('Dan', 'Druff',2,4),
       ('Holly', 'Day',3,null);