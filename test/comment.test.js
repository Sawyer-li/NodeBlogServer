const Comment = require('../models/comment.db.js');
const assert = require('assert');
const testData = {
    userId: 23,
    blogId: 1,
    repliedCommentId: 1,
    content: "girl is so easy"
}
// Comment.addCommnet(testData, (res)=>{
//     console.log(res);
// })
Comment.getBlogAllComment(20,(err,res)=>{
    console.log(res[0]);
})