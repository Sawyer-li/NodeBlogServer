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

exports.updateHead = function(){
  
}

exports.getUserAllItems = function(name, callback) {
  const _sql = "select * from sys_user where username = ?";
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
