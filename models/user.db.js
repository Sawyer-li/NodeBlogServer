const connect = require('./utils/connect');
exports.addUser = function(name, password,callback){
  const registerTime = new Date();
  const _addSql = 'INSERT sys_user(username,password,create_time) VALUES(?,?,?)';
  const _addSqlParam = [name,password,registerTime]
  connect.querySQL(_addSql, _addSqlParam, (err, rows, fields) => {
    if(err) throw err;
    callback(null, 1)
  })
}
exports.getUserAllItems = function(name, callback){
  const _sql = "select * from sys_user where username = ?";
  const _sqlParam = [name];
  connect.querySQL(_sql, _sqlParam, (err, rows, fields)=>{
    if(err) throw err;
    if(rows[0])
      callback(null, rows[0])
    else
      callback(null, null)
  })
}