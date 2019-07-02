const connect = require("./utils/connect");
const { logger } = require("../tool/log");

exports.addCommnet = function(data, callback){
    const { userId, blogId, content, repliedCommentId  } = data;
    console.log(data);
    const createTimer = new Date();
    const _sql = `INSERT sys_comment(user_id, blog_id, content,  replied_id, create_time) VALUES(?, ?, ?, ?, ?)`;
    const _sqlParam = [userId, blogId, content, repliedCommentId, createTimer];
    connect
        .querySQL(_sql,_sqlParam)
        .then((rows) => {
            console.log(rows);
            callback(null, rows.insertId);
        })
        .catch(err => {
            logger.error("addCommnet error:");
            logger.error(err);
            callback({ type: 500 });
        });
}
exports.getBlogAllComment = function(blogId, callback){
    const 
}