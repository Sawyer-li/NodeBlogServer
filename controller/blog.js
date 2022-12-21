const express = require("express");
const router = express.Router();
const Doc = require("../models/doc.db.js");
const expressJwt = require("express-jwt")
const { jwtsecret, staticPath } = require("../config");

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
router.post("/senddoc",expressJwt({ secret: jwtsecret }), function(req, res) {
  const { title, dochtml } = req.body;
  const  accountId  = req.user.id;
  if (!title) {                 
    res.status(400).json({msg: "title is null" });
    return;
  }
  if (!accountId) {
    res.status(400).json({ msg: "author is null" });
    return;
  }
  if (!dochtml) {
    res.status(400).json({ msg: "dochtml is null" });
    return;
  }
  //若干类型判断
  Doc.addDoc({
    accountId,
    title,
    dochtml
  }, function(err, id) {
    if(err) return res.status(err.type).json({ msg: err.msg })
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
    if(err) return res.status(err.type).json({ msg: err.msg });
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
    if(err) return res.status(err.type).json({ msg: err.msg });
    if (data.length === 0) {
      res.status(404).end();
    } else {
      data[0].head_url = staticPath + data[0].head_url;
      res.json(data[0]);
    }
  });
});

router.get("/getUserAllDoc/:id", function(req, res) {
  const { id } = req.params;
  Doc.getUserAllDocTitle(id, function(err, data) {
    if(err) return res.status(err.type).json({ msg: err.msg })
    res.json(data);
  });
});
router.get("/testDoc", function(req, res) {
  res.json({
    status: 'success'
  })
});

module.exports = router;