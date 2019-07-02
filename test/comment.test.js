const Comment = require('../models/comment.db.js');
const assert = require('assert');
const testData = {
    userId: 1,
    blogId: 1,
    repliedCommentId: 1,
    content: "123123123123333333333333333333333333333333333333333333333333333123123"
}
Comment.addCommnet(testData, (res)=>{
    console.log(res);
})