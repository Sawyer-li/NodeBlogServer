const express = require('express');
let router = express.Router();
const fs = require('fs');
const Helper = require('./helper');
const User =  require('../models/user.db.js');
const Doc = require('../models/doc.db.js');
const FS_PATH_SERVICES = './controller/services';
const REQUIRE_PATH_SERVICES = './services'

//router.option('*', function(req,res, next){
//  next();        
//})
router.get('/',function(req,res){
  res.send('这是api');        
})

router.get('/user/register',function(req, res){
  let props = req.query;
  props.password = Helper.getMD5(req.query.password);
  let user = new User({props: props});
  user.init();
  user.addUser(function(){
    console.log('success')       
  })
  res.send('注册通过了');  
})
//登入接口
router.get('/user/login', function(req, res){
  let props = req.query;
  let _res = res;
  let _req = req;
  props.password = Helper.getMD5(req.query.password);
  let user = new User({props: props});
  user.init();
  user.getUserAllItems(function(res){
    if(res.length == 0){
      console.log('user not exit');
      _res.send('用户名不存在');
    }else{
      if(res[0].password === props.password){
        _req.session.isLogin = 1;
        _req.session.userName = props.name;
        console.log('login success');
        _res.send('success'); 
      }else{
        _res.send('password error');
      }
    }
  })
})

router.get('/user/islogin', function(req, res){
    if(req.session.isLogin == 1){
      res.json({isLogin: true, userName: req.session.userName}) 
    }else{
      res.json({isLogin: false}) 
    }
  console.log(req.session);        
})
router.get('/doc/senddoc', function(req, res){
    let props = req.query;
    let _res = res;
    let _req = req;
    if(req.session.isLogin == 1){
        console.log(props);
        if(!props.title){
            _res.json({result: 0, msg: "title is null"});      
            return;
        }
        if(!props.author){
            _res.json({result: 0, msg: "author is null"});      
            return;
        }
        if(!props.dochtml){
            _res.json({result: 0, msg: "dochtml is null"});      
            return;
        }
        //若干类型判断
        Doc.senddoc(props, function(){
            _res.status(200);
            _res.json({result: 1,id: 2});      
        })
    }else{
      res.json({isLogin: false}) 
    }
  console.log(req.session);        
})
router.get('/blog/:id', function(req, res){
  const { id } = req.params;
  Doc.getDocItems(id, function(err, data){
    if(data.length === 0){
      res.status(404).end();
    }else{
      res.json(data[0])
    }
  });
})

router.get('/doc/getAllTitle', (req, res) => {
  const _res = res;
  Doc.getAllDocTitle((err, data)=>{
    if(err) console.log(err);
    _res.json({
      status: 1,
      data: data
    })
  })
})

router.get('/test/test1', function(req, res){
  console.log(req.session);        
})
module.exports = router;
