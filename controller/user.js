const express = require("express");
let router = express.Router();
const User = require("../models/user.db.js"); 
const jwt = require('jsonwebtoken');
const jwtsecret = require('../config').jwtsecret;
/**
 * @api {post} /api/user/register register
 * @apiName RegisterUser
 * @apiGroup User
 *
 * @apiParam {String} name user name
 * @apiParam {String} password user password
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post("/register", function(req, res) {
  const { name, password } = req.body;
  console.log(req.body);
  if (!name || name === "" || !password || password === "") {
    return res.status(401).json({
      mess: "账户或密码为空"
    });
  }
  User.addUser(name, password, function(err, data) {
    if (err) throw err;
    if(data)
      return res.json({
        mess: "创建成功"
      })
  });
});

/**
 * @api {post} /api/user/login login
 * @apiName LoginUser
 * @apiGroup User
 *
 * @apiParam {name} name User Name.
 * @apiParam {password} password  User Password
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post("/login", function(req, res) {
  const { name, password } = req.body;
  console.log(req.body);
  if (!name || name === "" || !password || password === "") {
    return res.status(401).json({
      mess: "账户或密码为空"
    });
  }
  User.getUserAllItems(name, (err, data) => {
    if (err) throw err;
    if (data) {
      if (password === data.password) {
        const user = req.body;
        const token =  jwt.sign(user, jwtsecret, {
          expiresIn: '2 days'
        });
        res.json({
          msg: "登入成功",
          token
        });
      } else {
        res.status(401).json({
          mess: "密码不正确"
        });
      }
    } else {
      res.status(401).json({
        mess: "账户不存在"
      });
    }
  });
});
router.get("/user", function(req, res) {
  if (req.session.isLogin == 1) {
    res.json({ isLogin: true, userName: req.session.userName });
  } else {
    res.json({ isLogin: false });
  }
  console.log(req.session);
});
module.exports = router;