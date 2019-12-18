//功能：海底捞服务器程序
//1:下载四个第三方模块
//express           web服务器
//mysql             mysql驱动
//express-session   会话对象
//cors              跨域
//[8080脚手架   4000服务器]
//npm i express mysql express-session cors
//2:引入第三方模块
const express = require("express");
const session = require("express-session");
const mysql = require("mysql");
const cors = require("cors");
//3:创建数据库连接池
var pool = mysql.createPool({
  host:"121.36.9.253",
  port:"3306",
  user:"root",
  password:"Liu@903265",
  database: "haidilao",
  connectionLimit: 15
})
//4:创建web服务器
var server = express();
//5:配置跨域
//允许跨域程序端口
server.use(cors({
    //允许哪个程序列表 脚手架
    origin:["http://127.0.0.1:8080",
    "http://localhost:8080"],
    //每次请求验证
    credentials:true
}));
//6:配置session对象
server.use(session({
   secret:"128位安全字符串",//加密条件
   resave:true,            //请求更新数据
   saveUninitialized:true  //保存初始化数据
}))
//7:指定静态目录  public
server.use(express.static("public")); 
//8:启动监听端口  4000
server.listen(4000);

//功能一：商品类别显示
server.get("/product/type",(req,res)=>{
  var sql = " SELECT tname FROM hdl_ptype";
  pool.query(sql,(err,result)=>{
    if(err)throw err;
    res.send({code:1,msg:"查询成功",data:result})
  })
  //x:json
})
//测试
//启动服务器  node hdlapp.js
//打开浏览器  
//http://127.0.0.1:4000/product/type
//http://127.0.0.1:4000/product/type?tid=2
//http://127.0.0.1:4000/product/type?tid=3

//功能二：商品显示
server.get("/product/list",(req,res)=>{
  //1:参数  页码  一页几行
  var tno = req.query.tno;
  //x:sql
  var sql = " SELECT cid,ctitle,cpic,soutitle,price FROM hdl_cai WHERE tno=?";
  pool.query(sql,[tno],(err,result)=>{
    if(err)throw err;
    res.send({code:1,msg:"查询成功",data:result})
  })
  //x:json
})
//测试
//启动服务器  node hdlapp.js
//打开浏览器  
//http://127.0.0.1:4000/product/list
//http://127.0.0.1:4000/product/list?tno=2
//http://127.0.0.1:4000/product/list?tno=3

//功能三：商品详情显示
server.get("/product/detail/:cid",(req,res)=>{
  //1:参数  页码  一页几行
  var cid = req.params.cid;
  //x:sql
  var sql = " SELECT ctitle,cpic,soutitle,price,details FROM hdl_cai WHERE cid=?";
  pool.query(sql,[cid],(err,result)=>{
    if(err)throw err;
    res.send({code:1,msg:"查询成功",data:result})
  })
  //x:json
})
//测试
//启动服务器  node hdlapp.js
//打开浏览器  
//http://127.0.0.1:4000/product/detail
//http://127.0.0.1:4000/product/detail/2
//http://127.0.0.1:4000/product/detail/3

