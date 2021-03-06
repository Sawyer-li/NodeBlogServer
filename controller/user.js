const express = require("express");
let router = express.Router();
const User = require("../models/user.db.js");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const { jwtsecret, staticPath } = require("../config");
const { strlen, camelCaseObjKey } = require("../tool");

/**
 * multer配置
 */
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function(req, file, cb) {
    const { originalname } = file;
    const fileArr = originalname.split(".");
    const fileType = fileArr[fileArr.length - 1];
    const fileName = originalname.slice(
      0,
      originalname.length - fileType.length - 1
    );
    cb(null, fileName + "-" + Date.now() + "." + fileType);
  }
});
const upload = multer({
  limits: {
    fileSize: 1000000000
  },
  storage: storage
});

router.get("/me", expressJwt({ secret: jwtsecret }), function(req, res) {
  const { user } = req;
  console.log(user);
  const { id } = user;
  User.getUserById(id, function(err, data) {
    if (err) {
      res.status(err.type).json({ msg: err.msg });
    } else {
      res.json(camelCaseObjKey(data));
    }
  });
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
router.post(
  "/avatar",
  expressJwt({ secret: jwtsecret }),
  upload.single("avatar"),
  function(req, res) {
    // 读取上传的图片信息
    const { file, user } = req;
    // 设置返回结果
    if (!file) {
      res.status(500).json({ msg: "上传图片中错误请联系管理员" });
    } else {
      const { id } = user;
      const { path } = file;
      const truePath = path.slice(6);
      User.updateHead(
        {
          id,
          path: truePath
        },
        (err, data) => {
          if (err) res.status(err.type).json({ msg: err.msg });
          res.json({ msg: "上传成功", path: staticPath + truePath });
        }
      );
    }
  }
);
router.post("/set", expressJwt({ secret: jwtsecret }), function(req, res) {
  const { user } = req;
  const { id } = user;
  const { type, text } = req.body;

  var callback = (err, data) => {
    console.log(data);
    if (err) return res.status(err.type).json({ msg: err.msg });
    res.json({ msg: "设置成功" });
  };
  if (type == "shortIntroduction") {
    User.updateShortIntro(
      {
        id,
        intro: text
      },
      callback
    );
  } else if (type == "introduction") {
    User.updateIntro(
      {
        id,
        intro: text
      },
      callback
    );
  } else if (type == "username") {
    User.updateUsername(
      {
        id,
        username: text
      },
      callback
    );
  } else if (type == "mobile") {
    User.updateMobile(
      {
        id,
        mobile: text
      },
      callback
    );
  }
  // const { id } = user;
  // if(strlen(intro) > 40){
  //   return res.status(400).json({
  //     msg: "不能超过20个汉子或40个字母"
  //   });
  // }
});
router.post("/register", function(req, res) {
  const { name, password, email } = req.body;
  const head_url = "/defaultHead.jpeg";
  if (!name || !password || !email) {
    return res.status(401).json({
      msg: "有必填项为空"
    });
  }

  User.addUser(
    {
      name,
      password,
      email,
      head_url
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
  const { account, password } = req.body;
  console.log(account, password);
  if (!account || account === "" || !password || password === "") {
    return res.status(400).json({
      mess: "账户或密码为空"
    });
  }
  const regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  function dealUser(err, data) {
    if (err) throw err;
    console.log(data);
    if (data) {
      if (password === data.password) {
        const { username, id, head_url } = data;
        const user = {
          username,
          id,
          head_url: staticPath + head_url
        };
        const token = jwt.sign(user, jwtsecret, {
          expiresIn: "2 days"
        });
        res.json({
          msg: "登入成功",
          token,
          user
        });
      } else {
        res.status(400).json({
          mess: "密码不正确"
        });
      }
    } else {
      res.status(400).json({
        mess: "账户不存在"
      });
    }
  }
  if (regEmail.test(account)) {
    User.getUserByEmail(account, dealUser);
  } else {
    User.getUserByName(account, dealUser);
  }
});
router.get("/:username", function(req, res) {});
module.exports = router;
