const express=require('express');
const pool=require('../pool.js');
let router=express.Router();
//商品列表
router.get('/list',function(req,res){
	let obj=req.query;
	if(!obj.pno || obj.pno<=0){
		obj.pno=1;
	}
	if(!obj.count){
		obj.count=2;
	}
	let start=(parseInt(obj.pno)-1)*parseInt(obj.count);
	obj.count=parseInt(obj.count);
	pool.query('SELECT * FROM xz_index_product LIMIT ?,?',[start,obj.count],function(err,result){
		if(err) throw err;
		if(result.length>0){
			res.send({
				pageCount: obj.count, 
				pno: obj.pno, 
				data: result	
			});
		}
	});
});

module.exports=router;