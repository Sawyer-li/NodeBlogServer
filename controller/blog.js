const express = require("express");
let router = express.Router();
const Doc = require("../models/doc.db.js");
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
router.post("/senddoc", function(req, res) {
  const { title, author, dochtml } = req.body;
  if (req.session.isLogin == 1) {
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
    Doc.senddoc(req.body, function() {
      res.json({ id: 2 });
    });
  } else {
    res.status(403).json({ msg: "no login"});
  }
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
  console.log("login in");
  Doc.getAllDocTitle((err, data) => {
    if (err) console.log(err);
    res.json({
      status: 1,
      data: data
    });
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
