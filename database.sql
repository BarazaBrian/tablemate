CREATE DATABASE IF NOT EXISTS tablemate_db;

USE tablemate_db;

CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE restaurant_tables (
    table_id INT AUTO_INCREMENT PRIMARY KEY,
    table_number INT NOT NULL,
    capacity INT NOT NULL,
    status VARCHAR(20) NOT NULL
);

CREATE TABLE reservations (
    reservation_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    table_id INT NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    number_of_people INT NOT NULL,
    status VARCHAR(20) NOT NULL,

    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE ON UPDATE CASCADE,

    FOREIGN KEY (table_id) REFERENCES restaurant_tables(table_id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE restaurant_staff (
    staff_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL
);

INSERT INTO customers (name, phone, email) VALUES
('Alice Martin', '57001111', 'alice@gmail.com'),
('Daniel Wong', '57002222', 'daniel@gmail.com'),
('Priya Shah', '57003333', 'priya@gmail.com'),
('Samuel Lee', '57004444', 'samuel@gmail.com'),
('Nadia Hassan', '57005555', 'nadia@gmail.com');


INSERT INTO restaurant_tables (table_number, capacity, status) VALUES
(1, 2, 'Available'),
(2, 4, 'Available'),
(3, 4, 'Available'),
(4, 6, 'Unavailable'),
(5, 8, 'Available');

INSERT INTO reservations (customer_id, table_id, reservation_date, reservation_time, number_of_people, status)
VALUES
(1, 2, '2024-06-15', '19:00:00', 2, 'Confirmed'),
(2, 3, '2024-06-16', '20:00:00', 4, 'Pending'),
(3, 1, '2024-06-17', '18:30:00', 2, 'Cancelled'),
(4, 5, '2024-06-18', '21:00:00', 6, 'Confirmed'),
(5, 4, '2024-06-19', '19:30:00', 8, 'Pending');

INSERT INTO restaurant_staff (name, role, phone, email) VALUES
('Emma Lewis', 'Manager', '57006666', 'emma@gmail.com'),
('Daniel Smith', 'Waiter', '57007777', 'daniel@gmail.com'),
('Sophia Brown', 'Waitress', '57008888', 'sophia@gmail.com'),
('James Wilson', 'Host', '57009999', 'james@gmail.com'),
('Olivia Davis', 'Cashier', '57000000', 'olivia@gmail.com');

