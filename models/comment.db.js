const connect = require("./utils/connect");
const { logger } = require("../tool/log");

exports.addCommnet = function(data, callback){
    const { userId, blogId, content, repliedCommentId  } = data;
    console.log(data);
    const createTimer = new Date();
    const _sql = `INSERT sys_comment(account_id, blog_id, content,  replied_id, create_time) VALUES(?, ?, ?, ?, ?)`;
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
    const _sql = `select sys_comment.*,sys_user.username,sys_user.head_url  
        from sys_comment 
        INNER JOIN                                                                                                                                                                                                                                                                                               sys_user  on sys_comment.account_id=sys_user.id  
        where sys_comment.blog_id=?`;
    const _sqlParam = [blogId];
    connect
        .querySQL(_sql,_sqlParam)
        .then((rows) => {
            callback(null, rows);
        })
        .catch(err => {
            logger.error("addCommnet error:");
            logger.error(err);
            callback({ type: 500 });
        });
}