-- Create the database
CREATE DATABASE IF NOT EXISTS database304;

-- Switch to the database
USE database304;

-- Create User table
CREATE TABLE User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255),
    name VARCHAR(255),
    address VARCHAR(255)
);

-- Create Order table
CREATE TABLE `Order` (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

-- Create Item table
CREATE TABLE Item (
    item_id INT PRIMARY KEY,
    item_name VARCHAR(255),
    inventory INT,
    cost DECIMAL(10, 2),
    image_name VARCHAR(255)
);

-- Create Pizza table
CREATE TABLE Pizza (
    item_id INT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255)
);


-- Create Drink table
CREATE TABLE Drink (
    item_id INT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255)
);

-- Create Desert table
CREATE TABLE Desert (
    item_id INT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255)
);

-- Create Coupons table
CREATE TABLE Coupons (
    coupon_id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(255),
    percentage DECIMAL(5, 2),
    item_id INT,
    FOREIGN KEY (item_id) REFERENCES Item(item_id)
);

-- Create OrderItem table
CREATE TABLE OrderItem (
    order_id INT,
    item_id INT,
    PRIMARY KEY (order_id, item_id),
    FOREIGN KEY (order_id) REFERENCES `Order`(order_id),
    FOREIGN KEY (item_id) REFERENCES Item(item_id)
);

-- Add Pizzas
INSERT INTO Item (cost, inventory, image_name, item_id) VALUES (12.99, 12, 'menu_caesar.jpg', 1);
INSERT INTO Pizza (name, item_id, description) VALUES ('Caesar Pizza', 1, 'Classic Caesar Salad as a Pizza');

INSERT INTO Item (cost, inventory, image_name, item_id) VALUES (10.99, 23, 'menu_chicken.jpg', 2);
INSERT INTO Pizza (name, item_id, description) VALUES ('Caesar Pizza', 2, 'Grilled chicken with a blend of spices');

INSERT INTO Item (cost, inventory, image_name, item_id) VALUES (11.99, 15, 'menu_hawaiian.jpg', 3);
INSERT INTO Pizza (name, item_id, description) VALUES ('Hawaiian Pizza', 3, 'Ham and pineapple delight');

INSERT INTO Item (cost, inventory, image_name, item_id) VALUES (8.99, 11, 'menu_margherita.jpg', 4);
INSERT INTO Pizza (name, item_id, description) VALUES ('Margherita Pizza', 4, 'Classic tomato, mozzarella, and basil');

INSERT INTO Item (cost, inventory, image_name, item_id) VALUES (15.99, 13, 'menu_meat.jpg', 5);
INSERT INTO Pizza (name, item_id, description) VALUES ('Meat Lovers Pizza', 5, 'A carnivore’s dream');

INSERT INTO Item (cost, inventory, image_name, item_id) VALUES (15.99, 13, 'menu_pepperoni.jpg', 6);
INSERT INTO Pizza (name, item_id, description) VALUES ('Pepperoni Pizza', 6, 'Classic pepperoni goodness');


-- Add Drinks
INSERT INTO Item (inventory, image_name, item_id) VALUES (20, 'menu_coke.jpg', 7);
INSERT INTO Drink (name, item_id, cost, description) VALUES ('Coke', 7, 1.99, 'Classic Coca-Cola');

INSERT INTO Item (inventory, image_name, item_id) VALUES (18, 'menu_pepsi.jpg', 8);
INSERT INTO Drink (name, item_id, cost, description) VALUES ('Pepsi', 8, 1.99, 'Refreshing Pepsi Cola');

INSERT INTO Item (inventory, image_name, item_id) VALUES (15, 'menu_milk.jpg', 9);
INSERT INTO Drink (name, item_id, cost, description) VALUES ('Milk', 9, 2.99, 'Fresh and wholesome milk');

-- Add Coupons
INSERT INTO Coupons (code, percentage, item_id) VALUES ('HAWAIIAN10', 10.00, (SELECT item_id FROM Pizza WHERE name = 'Hawaiian Pizza'));

INSERT INTO Coupons (code, percentage, item_id) VALUES ('MEATLOVERS20', 20.00, (SELECT item_id FROM Pizza WHERE name = 'Meat Lovers Pizza'));

-- Add User
INSERT INTO User (username, password, email, name, address)
VALUES ('user', 'pass', 'john@gmail.com', 'John', '1433 25th street');
