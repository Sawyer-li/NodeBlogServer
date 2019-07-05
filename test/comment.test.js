const Comment = require('../models/comment.db.js');
const assert = require('assert');
const testData = {
    userId: 20,
    blogId: 37,
    repliedCommentId: 1,
    content: "asdasa lalal1212321331123123231231al"
}
Comment.addCommnet(testData, (res)=>{
    console.log(res);
})
// Comment.getBlogAllComment(37,(err,res)=>{
//     console.log(res);
// })