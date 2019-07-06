const express = require("express");
let router = express.Router();
const Comment = require("../models/comment.db.js");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const { jwtsecret, staticPath } = require("../config");

/**
 * @api {post} /api/comment/addComment AddComment
 * @apiName AddComment
 * @apiGroup Comment
 *
 * @apiParam {String} content
 * @apiParam {Integer} blogId
 *
 */
router.post("/addComment",expressJwt({ secret: jwtsecret }), function(req, res) {
    const { content, blogId } = req.body;
    const  accountId  = req.user.id;
    if (!content) {                 
      res.status(400).json({msg: "content is null" });
      return;
    }
    if (!accountId) {
      res.status(400).json({ msg: "author is null" });
      return;
    }
    if (!blogId) {
      res.status(400).json({ msg: "blogId is null" });
      return;
    }
    //若干类型判断
    Comment.addCommnet({
        content,
        blogId,
        userId: accountId
    }, function(err, id) {
      if (err) throw err;
      res.json({ id });
    });
});

/**
 * @api {post} /api/comment/:blogId GetBlogAllComment
 * @apiName GetBlogAllComment
 * @apiGroup Comment
 */
router.get("/:blogId", function(req, res){
  const { blogId } = req.params;
  console.log(blogId);
  Comment.getBlogAllComment(blogId, function(err, rows){
    console.log(rows);
    for(let i =0; i<rows.length; i++){
      rows[i].head_url = staticPath + rows[i].head_url;
    }
    staticPath
    res.json(rows);
  })
})
module.exports = router;