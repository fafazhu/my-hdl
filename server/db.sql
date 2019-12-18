#功能:vue_server_00 学子商城服务器端
#程序
#功能一:创建用户登录用户并且添加二个用#户
#1:进入指定库 xz
USE xz;
#2:创建表 xz_login
CREATE TABLE xz_login(
  id INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(50),
  upwd  VARCHAR(32)
);
#3:添加二条合法用户
INSERT INTO xz_login VALUES(null,'tom',md5('123'));
INSERT INTO xz_login VALUES(null,'jerry',md5('123'));