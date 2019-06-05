const connect = require('./utils/connect');
//查询所有文章标题
exports.getAllDocTitle = function(callback){
  const _sql = "select id,title from sys_doc order by id desc";
  connect.querySQL(_sql, (err, rows, fields) => {
    if (err) throw(err);
    callback(err, rows);
  })
}
//查询某个文章详情
exports.getDocItems = function(id, callback){
  const _sql = "select * from sys_doc where id = ?"
  const _addSqlParam = [id];
  connect.querySQL(_sql, _addSqlParam, (err, rows, fields) => {
    if (err) throw(err);
    callback(err, rows);
  })
}
//发送一篇文章
exports.senddoc = function(docData, callback){
  const {dochtml, author, title} = docData;
  const _sql = 'INSERT sys_doc(dochtml,create_time,author,title) VALUES(?,?,?,?)';
  const createTimer = new Date();
  const _sqlParam = [dochtml, createTimer, author, title];
  connect.querySQL(_sql,  _sqlParam, function(err, rows, fields){
    if (err) throw(err);;
    callback(err, 1)
  })
}