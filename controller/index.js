const express = require("express");
const expressJwt = require("express-jwt");
const { jwtsecret } = require('../config');

const jwtAuth = expressJwt({secret: jwtsecret})
  .unless({path: ["/api/user/login", "/api/user/register", "/api/blog"]});
const user = require('./user');
const blog = require('./blog');

let router = express.Router();
router.use(jwtAuth);
router.use('/user', user)
router.use('/blog', blog);
module.exports = router;