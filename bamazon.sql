DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(300) NULL,
department_name VARCHAR(300) NULL,
price DECIMAL(10,2) NULL,
stock_quantity INT NULL,
PRIMARY KEY (item_id) 
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Harry Potter, The Philosopher's Stone", "Books", 15.99, 350),
("Remember the Titans", "Movies", 10.20, 20),
("Apple iPad, 64GB, Rose Gold", "Electronics", 355.99, 5),
("A very fancy chair", "Home", 19023.98, 2),
("European chocolate you can't resist", "Food", 15.05, 775),
("Lipstick from some Kardashian", "Beauty", 28.73, 1000),
("A plastic toy for your child", "Toys", 10.59, 346),
("A purse to hold your stuff", "Clothing", 20.00, 100),
("A nose ring", "Jewelry", 35.00, 15),
("A raquet", "Sports", 110.93, 270);


SELECT * FROM products;