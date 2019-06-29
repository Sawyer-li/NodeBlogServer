const connect = require("./utils/connect");
const { logger } = require("../tool/log");

exports.addUser = async function(user, callback) {
  const { name, password, email } = user;
  const findNameSql = `SELECT id from sys_user where username='${name}'`;
  const findEmailSql = `SELECT id from sys_user where email='${email}'`;
  await Promise.all([
    connect.querySQL(findNameSql),
    connect.querySQL(findEmailSql)
  ])
    .then(res => {
      const canInsert = res.every(item => {
        return item.length === 0;
      });

      if (canInsert) {
        const registerTime = new Date();
        const _addSql =
          "INSERT sys_user(username,password,create_time,email) VALUES(?,?,?,?)";
        const _addSqlParam = [name, password, registerTime, email];
        connect.querySQL(_addSql, _addSqlParam).then(rows => {
          callback(null, {
            msg: "插入成功"
          });
        });
      } else {
        callback({ type: 400, msg: "用户名或邮箱重复" });
      }
    })
    .catch(err => {
      logger.error("addUser error");
      logger.error(err);
      callback({ type: 500 });
    });
};

exports.updateHead = function(data, callback){
  const {path, id } = data;
  const   _sql = `UPDATE sys_user SET head_url = ? WHERE id = ${id}`;
  const _sqlParam = [path];
  connect
    .querySQL(_sql, _sqlParam)
    .then(rows => {
      callback(null,rows);
    })
    .catch(err => {
      logger.error("updateHead error");
      logger.error(err);
      callback({type: 500,msg: "model层错误"});
    })
}

exports.getUserAllItems = function(name, callback) {
  const _sql = "SELECT * FROM sys_user WHERE username = ?";
  const _sqlParam = [name];
  connect
    .querySQL(_sql, _sqlParam)
    .then(rows => {
      if (rows[0]) callback(null, rows[0]);
      else{
        callback(null, null);
      }
    })
    .catch(err => {
      logger.error("getUserAllItems error");
      logger.error(err);
      callback({ type: 500 });
    });
};
