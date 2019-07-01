const connect = require("./utils/connect");
const { logger } = require("../tool/log");
//查询所有文章标题
exports.getAllDocTitle = function(callback) {
  const _sql =
    "SELECT id,title,author,create_time FROM sys_blog ORDER BY id DESC";
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
//根据id查询文章详情
exports.getDocItems = function(id, callback) {
  const _sql = "select * from sys_blog where id = ?";
  const _addSqlParam = [id];
  connect
    .querySQL(_sql, _addSqlParam)
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
exports.senddoc = function(docData, callback) {
  const { dochtml, author, title } = docData;
  const _sql =
    "INSERT sys_blog(dochtml,create_time,author,title) VALUES(?,?,?,?)";
  const createTimer = new Date();
  logger.fatal(createTimer);
  const _sqlParam = [dochtml, createTimer, author, title];
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
