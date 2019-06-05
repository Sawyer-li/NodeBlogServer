const mysql = require("mysql"),
  config = require("../../config").mysql;
const pool = mysql.createPool(config);
const { logger } = require('../../tool/log'); 
/**
 * sql语句
 * 参数数据(可选)
 * 回调用函数
 */
exports.querySQL = function(sql) {
  const data = arguments;
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        logger.error("database connect fail");
        reject(err);
        return;
      };
      if (data.length === 2) {
        const _sql = data[0];
        const _sqlParam = data[1];
        connection.query(_sql, _sqlParam, function(err, rows) {
          if (err) {
            logger.error("database query fail");
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        });
      } else if (data.length === 1) {
        const _sql = data[0];
        connection.query(_sql, function(err, rows) {
          if (err) {
            logger.error("database query fail");
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
};
