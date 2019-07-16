const connect = require("./utils/connect");
const { logger } = require("../tool/log");
const { strlen } = require("../tool")
exports.updateShortIntro = function(data, callback) {
  const { id, intro } = data;
  const _sql = `UPDATE sys_user SET short_introduction="${intro}" WHERE id=${id}`;
  connect
    .querySQL(_sql)
    .then(rows => {
      callback(null, rows);
    })
    .catch(err => {
      logger.error("updateSampleIntro error");
      logger.error(err);
      callback({ type: 500, msg: "model层错误" });
    });
};
exports.updateIntro = function(data, callback) {
  const { id, intro } = data;
  const _sql = `UPDATE sys_user SET introduction="${intro}" WHERE id=${id}`;
  connect
    .querySQL(_sql)
    .then(rows => {
      callback(null, rows);
    })
    .catch(err => {
      logger.error("updateIntro error");
      logger.error(err);
      callback({ type: 500, msg: "model层错误" });
    });
};
exports.addUser = async function(user, callback) {
  const { name, password, email, head_url } = user;
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
          "INSERT sys_user(username,password,create_time,email,head_url) VALUES(?,?,?,?,?)";
        const _addSqlParam = [name, password, registerTime, email, head_url];
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
exports.updateHead = function(data, callback) {
  const { path, id } = data;
  const _sql = `UPDATE sys_user SET head_url = ? WHERE id = ${id}`;
  const _sqlParam = [path];
  connect
    .querySQL(_sql, _sqlParam)
    .then(rows => {
      callback(null, rows);
    })
    .catch(err => {
      logger.error("updateHead error");
      logger.error(err);
      callback({ type: 500, msg: "model层错误" });
    });
};
exports.getUserByEmail = function(email, callback) {
  const _sql = "SELECT * FROM sys_user WHERE email = ?";
  const _sqlParam = [email];
  connect
    .querySQL(_sql, _sqlParam)
    .then(rows => {
      if (rows[0]) callback(null, rows[0]);
      else {
        callback(null, null);
      }
    })
    .catch(err => {
      logger.error("getUserByEmail error");
      logger.error(err);
      callback({ type: 500 });
    });
};
exports.getUserByName = function(name, callback) {
  const _sql = "SELECT * FROM sys_user WHERE username = ?";
  const _sqlParam = [name];
  connect
    .querySQL(_sql, _sqlParam)
    .then(rows => {
      if (rows[0]) callback(null, rows[0]);
      else {
        callback(null, null);
      }
    })
    .catch(err => {
      logger.error("getUserByName error");
      logger.error(err);
      callback({ type: 500 });
    });
};
exports.getUserById = function(id, callback) {
  const _sql = "SELECT * FROM sys_user WHERE id = ?";
  const _sqlParam = [name];
  connect
    .querySQL(_sql, _sqlParam)
    .then(rows => {
      if (rows[0]) callback(null, rows[0]);
      else {
        callback(null, null);
      }
    })
    .catch(err => {
      logger.error("getUserById error");
      logger.error(err);
      callback({ type: 500 });
    });
};
