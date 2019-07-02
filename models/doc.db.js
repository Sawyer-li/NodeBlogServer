const connect = require("./utils/connect");
const { logger } = require("../tool/log");
//查询所有文章标题及用户名
exports.getAllDocTitle = function(callback) {
  const _sql =
    `SELECT sys_blog.id,sys_blog.title, sys_blog.create_time, sys_user.username as author
      FROM sys_blog INNER JOIN  sys_user  on sys_blog.account_id=sys_user.id
      ORDER BY sys_blog.id DESC`;
  connect
    .querySQL(_sql)
    .then((rows) => {
      callback(null, rows);
    })
    .catch(err => {
      logger.error("getAllDocTitle error:");
      logger.error(err);
      callback({ type: 500 });
    });
};

//根据id查询文章及用户信息
exports.getDocItems = function(id, callback) {
  const _sql =
    `SELECT sys_blog.id,sys_blog.title, sys_blog.create_time, sys_blog.create_time, sys_blog.dochtml,  
      sys_user.username as author, sys_user.head_url 
      FROM sys_blog INNER JOIN  sys_user  on sys_blog.account_id=sys_user.id
      WHERE sys_blog.id =${id}`;
  connect
    .querySQL(_sql)
    .then((rows) => {
      callback(null, rows);
    })
    .catch(err => {
      logger.error("getDocItems error:");
      logger.error(err);
      callback({ type: 500 });
    });
};

//发送一篇文章
exports.addDoc = function(docData, callback) {
  const { dochtml, accountId, title } = docData;
  const _sql = "INSERT sys_blog(dochtml, create_time, account_id, title) VALUES(?,?,?,?)";
  const createTimer = new Date();
  const _sqlParam = [dochtml, createTimer, accountId, title];
  connect
    .querySQL(_sql, _sqlParam)
    .then((rows) => {
      callback(null, rows.insertId);
    })
    .catch(err => {
      logger.error("getDocItems error:");
      logger.error(err);
      callback({ type: 500 });
    });
};
