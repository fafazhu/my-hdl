const express=require('express');
//引入数据库连接池模块
const pool=require('../pool.js')//../上一级  再上一级../../
//console.log(pool);
let router=express.Router();
//1. 用户注册
//代码折叠：editsplus —— view —— code folding —— use code foolding
router.post('/reg',function(req,res){
	//1.1获取post请求的数据
	let obj=req.body;
	//1.2对数据进行验证，是否为空
	if(!obj.uname){
		res.send({code:401,msg:'uname required'});
		//阻止往后执行
		return;
	}
	if(!obj.upwd){
		res.send({code:402,msg:'upwd required'});
		return;
	}
	if(!obj.email){
		res.send({code:403,msg:'email required'});
		return;
	}
	if(!obj.phone){
		res.send({code:404,msg:'phone required'});
		return;
	}
	//1.3将数据插入数据库
	pool.query('INSERT INTO xz_user SET ?',[obj],function(err,result){
		if(err) throw err;
		console.log(result);
	//如果插入成功
	    if(result.affectedRows>0){
          res.send({code:200,msg:'reg suc'});
	    }

	});
});
//用户登录
router.post('/login',function(req,res){
	//获取数据
	let obj=req.body;
	//验证数据是否为空
	if(!obj.uname){
		res.send({code:401,msg:'uname required'});
		return;
	}
	if(!obj.upwd){
		res.send({code:402,msg:'upwd required'});
		return;
	}
	//执行SQL语句
	//查询是否有用户名和密码同时匹配的数据，如果有登陆成功，否则登录失败
	pool.query('SELECT*FROM xz_user WHERE uname=? AND upwd=?',[obj.uname,obj.upwd],function(err,result){
		if(err) throw err;
		console.log(result);
		//结果是数组，如果数组元素个数>0，则登录成功，否则空数组登录失败
		if(result.length>0){
			res.send({code:200,msg:'login suc'});
		}else{
			res.send({code:301,msg:'login err'});
		}
	});
});
//检索用户
router.get('/detail',function(req,res){
	//获取数据
	let obj=req.query;
	//检测数据是否为空
	if(!obj.uid){
		res.send({code:401,msg:'uid,required'});
		return;
	}
	//执行SQL语句
	pool.query('SELECT * FROM xz_user WHERE uid=?',[obj.uid],function(err,result){
		if(err) throw err;
		if(result.length===0){
			res.send({code:301,msg:'not found'});
		}else{
			res.send({code:200,rst:result[0]});
		}
	})
});
//修改用户资料
router.get('/update',function(req,res){
	let obj=req.query;
	let i=400;
	//遍历对象验证数据是否为空，key为属性名，obj[key]为属性值，变量i自增记录code
	for(let key in obj){
		i++;
		if(!obj[key]){
			res.send({code:i,msg:key+' required'});
			return;
		}
	}
	pool.query('UPDATE xz_user SET ? WHERE uid=?',[obj,obj.uid],function(err,result){
		if(err) throw err;
		console.log(result);
		if(result.affectedRows>0){
			res.send({code:200,msg:'update suc'});
		}else{
			res.send({code:301,msg:'update err'});
		}
	})
});
//用户列表
router.get('/list',function(req,res){
	//获取数据
	let obj=req.query;
	//如果页码为空，默认1，大小为空，默认2
	//页码处理不能为负数，不能为小数
	if(!obj.page || obj.page<=0){
		obj.page=1;
	}
	if(!obj.size){
		obj.size=2;
	}
	//if(obj.page<=0) obj.page=1;
	//将大小转为数值型
	let count=parseInt(obj.size);
	//计算start
	let start=(parseInt(obj.page)-1)*count;
	//执行SQL语句
	pool.query('SELECT * FROM xz_user LIMIT ?,?',[start,count],function(err,result){
		if(err) throw err;
		res.send({code:200,msg:result});
	});
});
//删除数据
router.get('/delete',function(req,res){
	let obj=req.query;
	if(!obj.uid){
		res.send({code:401,msg:'uid required'});
		return;
	}
	pool.query('DELETE FROM xz_user WHERE uid=?',[obj.uid],function(err,result){
		if(err) throw err;
		if(result.affectedRows>0){
			res.send({code:200,msg:'delete suc'});
		}else{
			res.send({code:301,msg:'delete err'});
		}
	});
});
module.exports=router;
//md5加密密码，md5('密码')