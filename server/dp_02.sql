#购物车表
USE xz;
CREATE TABLE xz_cart(
    id INT PRIMARY KEY AUTO_INCREMENT,
    lid INT,
    price DECIMAL(10,2),
    count INT,
    lname VARCHAR(255),
    uid INT
);
