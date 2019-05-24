const mysql = require("mysql"),
  config = require("../../config").mysql;
const pool = mysql.createPool(config);
exports.querySQL = function(sql, callback) {
  /**
   * sql语句
   * 参数数据(可选)
   * 回调用函数
   */
  const data = arguments;
  pool.getConnection(function(err, connection) {
    console.log(err);
    if (err) throw err;
    if (data.length === 3) {
      const _sql = data[0];
      const _sqlParam = data[1];
      const callback = data[2];
      connection.query(_sql, _sqlParam,  function(error, rows, fields) {
        callback(error, rows, fields);
        connection.release();
      });
    } else if (data.length === 2) {
      const _sql = data[0]; 
      const callback = data[1];
      connection.query(_sql, function(error, rows, fields) {
        callback(error, rows, fields);
        connection.release();
      });
    }
  });
};
