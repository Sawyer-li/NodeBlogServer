const express = require("express");
let router = express.Router();
const User = require("../models/user.db.js");
const expressJwt = require("express-jwt")
const jwt = require("jsonwebtoken");
const { jwtsecret } = require("../config")

/**
 * multer配置
 */
const multer  = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'public/uploads');
  },
  filename: function(req, file, cb){
    const { originalname } = file;
    const fileArr = originalname.split(".");
    const fileType = fileArr[fileArr.length-1];
    const fileName =  originalname.slice(0,originalname.length - fileType.length -1);
    cb(null, fileName + '-' + Date.now() + "." + fileType);
  }
});
const upload = multer({ 
  limits: {
    fileSize: 1000000000
  },
  storage: storage
});

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
router.post("/avatar", expressJwt({ secret: jwtsecret }), upload.single('avatar'),function(req, res){
  // 读取上传的图片信息
  const { file, user } = req;
  // 设置返回结果
  var result = {};
  if(!file) {
    res.status(500).json({ msg: "上传图片中错误请联系管理员" }); 
  } else {
    const { id } = user;
    const { path } = file;
    User.updateHead({
      id,
      path
    },(err, data)=>{
      if(err) res.status(err.type).json({ msg: err.msg });
      console.log(data);
      console.log("success");
      res.json({msg: "上传成功"});
    })
  }
})

router.post("/register", function(req, res) {
  const { name, password, email } = req.body;
  if (!name || !password || !email) {
    return res.status(401).json({
      msg: "有必填项为空"
    });
  }

  User.addUser(
    {
      name,
      password,
      email
    },
    function(err, data) {
      if (err) {
        res.status(err.type).json({ msg: err.msg });
      } else {
        res.json({
          msg: "创建成功"
        });
      }
    }
  );
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
        const { username, id, head_url} = data;
        const user = {
          username,
          id,
          head_url
        };
        const token = jwt.sign(user, jwtsecret, {
          expiresIn: "2 days"
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
