USE employee_db;

INSERT INTO department (name)
VALUES ("Sales"),
("Human Resources"),
("Management");

INSERT INTO role (title, salary, department_id)
VALUES("Salesman", 50000.00, 1),
("Manager", 65000.00, 3),
("Hiring Instructor", 56000.00, 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Hillary", "Vos", 2),
("Andres", "Long", 3),
("John", "Doe", 1);