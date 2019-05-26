const express = require("express");
let router = express.Router();
const user = require('./user');
const blog = require('./blog');
router.use('/user', user)
router.use('/blog', blog);
module.exports = router;