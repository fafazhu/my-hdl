//功能：学子商城服务器程序
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
   host:"127.0.0.1",
   user:"root",
   password:"",
   port:3306,
   connectionLimit:15,
   database:"xz"
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


//功能一;完成用户登录验证
server.get("/login",(req,res)=>{
  //1:获取参数 uname upwd
  var n = req.query.uname;
  var p = req.query.upwd;
  //2:创建sql
  var sql =" SELECT id FROM xz_login WHERE uname = ? AND upwd = md5(?)";
  //3:发送sql并且结果返回脚手架
  pool.query(sql,[n,p],(err,result)=>{
     //4:如果发生严重错误抛出
     if(err)throw err;
     //5:登录成功用户名密码有错
     if(result.length==0){
       res.send({code:-1,msg:"用户名或密码有误"})
     }else{
       //6:登录成功
       //7:将登录成功的用户id保存到session对象作为已登录凭证
       req.session.uid=result[0].id;
       res.send({code:1,msg:"登录成功"});
     }
  })
})

//测试
//1:启动服务器 node app.js
//2:启动mysql 3006
//3:http://127.0.0.1:4000/login?uname=tom&upwd=122
//3:http://127.0.0.1:4000/login?uname=tom&upwd=123


//功能二:商品列表分页显示
server.get("/product",(req,res)=>{
  //1:参数  页码  一页几行
  var pno = req.query.pno;
  var ps = req.query.pageSize;
  //2:默认指定页码一页几行
  if(!pno){pno=1}
  if(!ps){ps=20}
  //x:sql
  var offset = (pno-1)*ps;
  ps = parseInt(ps);
  var sql = " SELECT lid,lname,price,pic FROM xz_laptop LIMIT ?,?";
  pool.query(sql,[offset,ps],(err,result)=>{
    if(err)throw err;
    res.send({code:1,msg:"查询成功",data:result})
  })
  //x:json
})
//测试
//复制db_01.sql 复制
//启动服务器  node app.js
//打开浏览器  
//http://127.0.0.1:4000/product
//http://127.0.0.1:4000/product?pno=2
//http://127.0.0.1:4000/product?pno=3

// 功能三 添加购物车
// 1. get /addcart
server.get("/addcart",(req,res)=>{
  // 获取当前登录用户的uid
  var uid=req.session.uid;
  // 如果用户没登录，返回错误信息
  if(!uid){
    res.send({code:-2,msg:"请登录"});
    return;
  }
  // 获取参数
  var lid=req.query.lid;
  var lname=req.query.lname;
  var price=req.query.price;
  // 查询用户是否购买过此商品
  var sql="SELECT id FROM xz_cart WHERE uid=? AND lid=?";
  pool.query(sql,[uid,lid],(err,result)=>{
    if (err) throw err;
    if(result.length==0){
      // 如果没加购，添加产品
      var sql=`INSERT INTO xz_cart VALUES (null,${lid},${price},1,'${lname}',${uid})`;
    }else{
      // 加购了，更新数量
      var sql=`UPDATE xz_cart SET count=count+1 WHERE uid=${uid} AND lid=${lid}`;
    }
    pool.query(sql,(err,result)=>{
      if(err) throw err;
      res.send({code:1,msg:"添加成功"});
    })
  })
})

//测试
//添加
// http://127.0.0.1:4000/addcart?lid=1&price=99&lname=apple
// 登录
//http://127.0.0.1:4000/login?uname=tom&upwd=123
// 再次添加
// http://127.0.0.1:4000/addcart?lid=1&price=99&lname=apple


// 功能四 查询当前登录用户购物车信息
server.get("/findcart",(req,res)=>{
  // 获取凭证的uid
  var uid=req.session.uid;
  if(!uid){
    res.send({code:-2,msg:"请登录"});
    return;
  }
  var sql="SELECT id,lid,lname,price,count FROM xz_cart WHERE uid=?"
  pool.query(sql,[uid],(err,result)=>{
    if (err) throw err;
    res.send({code:1,msg:"查询成功",data:result});
  })
})
// 测试
// http://127.0.0.1:4000/findcart?uid=1
// 登录
//http://127.0.0.1:4000/login?uname=tom&upwd=123
// 再次查询
// http://127.0.0.1:4000/findcart?uid=1


// 功能五 删除一条记录
server.get("/del",(req,res)=>{
  // 判断是否登录
  if(!req.session.uid){
    res.send({code:-2,msg:"请登录"});
  }
  var sql='DELETE FROM xz_cart WHERE id=?';
  pool.query(sql,[req.query.id],(err,result)=>{
    if (err) throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"删除成功"});
    }else{
      res.send({code:-1,msg:"删除失败"});
    }
  })
})

// 测试
// http://127.0.0.1:4000/del?id=1
// 登录
//http://127.0.0.1:4000/login?uname=tom&upwd=123
// 再次删除
// http://127.0.0.1:4000/del?id=1


// 功能六 删除多条记录
server.get("/delm",(req,res)=>{
  if(!req.session.uid){
    console.log({code:-2,msg:"请登录"});
    return;
  }
  var sql=`DELETE FROM xz_cart WHERE id IN (${req.query.ids})`
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"删除成功"});
    }else{
      res.send({code:-1,msg:"删除失败"});
    }
  })
})
// 测试
// http://127.0.0.1:4000/delm?ids=1,2
// 登录
//http://127.0.0.1:4000/login?uname=tom&upwd=123
// 再次删除
// http://127.0.0.1:4000/delm?ids=1,2