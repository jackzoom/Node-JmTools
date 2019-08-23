var express = require('express');
var router = express.Router();

const mysql = require('mysql');
const db =require('../config/db');
const user = require('../config/user');
const connection = mysql.createConnection(db.mysql);
connection.connect();
router.post('/register',function(req,res){
  let params = req.body;  
  connection.query(user.getUserByPhone,params.phone,(err,result)=>{
    if(err) throw 666
    else{
      if(result.length!=0){
        res.send({
          status:1001,
          msg:'该手机号已经注册'
        })
        res.end()
      }else if(result.length==0){        
        let userInfo = [params.name,params.phone,params.email,params.password];
        if(params.phone==''){
          res.send({
            status:2001,
            msg:'请输入正确的手机号码'
          })
          return res.end()
          
        }
        connection.query(user.insert,userInfo,(err,result)=>{
          if(err) throw err
          else{
            res.send({
              params,
              status:0000,
              message:'注册成功',
              data:result
            })
            res.end()
          }
        })
      }
    }
  })
})

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('6666');
// });

module.exports = router;
