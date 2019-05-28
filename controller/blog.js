const express = require("express");
let router = express.Router();
const Doc = require("../models/doc.db.js");

const expressJwt = require("express-jwt");
const { jwtsecret } = require('../config');
const jwtAuth = expressJwt({secret: jwtsecret});
/**
 * @api {post} /api/blog/senddoc SendBlog
 * @apiName SendBlog
 * @apiGroup Blog
 *
 * @apiParam {String} title
 * @apiParam {String} author
 * @apiParam {String} dochtml
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post("/senddoc",jwtAuth, function(req, res) {
  const { title, dochtml } = req.body;
  const  author  = req.user.name;
  if (!title) {
    res.status(400).json({msg: "title is null" });
    return;
  }
  if (!author) {
    res.status(400).json({ msg: "author is null" });
    return;
  }
  if (!dochtml) {
    res.status(400).json({ msg: "dochtml is null" });
    return;
  }
  //若干类型判断
  Doc.senddoc({
    author,
    title,
    dochtml
  }, function(err, id) {
    if (err) throw err;
    res.json({ id });
  });
});

/**
 * @api {get} /api/blog/getAllTitle GetAllBlogTitle
 * @apiName GetAllBlogTitle
 * @apiGroup Blog
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.get("/getAllTitle", (req, res) => {
  Doc.getAllDocTitle((err, data) => {
    if (err) console.log(err);
    res.json(data);
  });
});

/**
 * @api {get} /api/blog/getBlogDetail/:id  GetBlogDetail
 * @apiName GetBlogDetail
 * @apiGroup Blog
 */
router.get("/getBlogDetail/:id", function(req, res) {
  const { id } = req.params;
  Doc.getDocItems(id, function(err, data) {
    if (data.length === 0) {
      res.status(404).end();
    } else {
      res.json(data[0]);
    }
  });
});

module.exports = router;
