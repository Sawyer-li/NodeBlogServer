const connect = require('./utils/connect');

//查询所有文章标题
exports.getAllDocTitle = function(callback){
  const _sql = "select id,title from sys_doc";
  connect.querySQL(_sql, (err, rows, fields) => {
    if (err) throw(err);
    callback(err, rows);
  })
}

//查询某个文章详情
exports.getDocItems = function(id, callback){
  const _sql = "select * from sys_doc where id = ?"
  const _addSqlParam = id;  
  connect.querySQL(_sql, _addSqlParam, (err, rows, fields) => {
    if (err) throw(err);
    callback(err, rows);
  })
}

//发送一篇文章
exports.senddoc = function(docData, callback){
  const _sql = 'INSERT sys_doc(dochtml,create_time,author,title) VALUES(?,?,?,?)';
  const createTimer = new Date();
  const _sqlParam = [docData.dochtml, createTimer, docData.author, docData.title];
  connect.querySQL(_sql,  _sqlParam, function(err, rows, fields){
    if (err) throw(err);;
    console.log(rows);
    callback(err, rows)
  })
}




// console.log(Doc.getAllDocTitle.);
// let Doc = function(doc){
//     if(doc){
//         this.props = doc.props;
//         this.con;
//     }else{
//         return "noProps";
//     }
// }
// Doc.prototype.init = function(){
//     this.con = mysql.createConnection(config);
//     handleDisconnect(this.con);
//     return 'success';
// }

// Doc.prototype.senddoc = function(callback){
//     let _sql = "insert ";
//     let addSql = 'INSERT sys_doc(dochtml,create_time,author,title) VALUES(?,?,?,?)';
//     let createTimer = new Date();
//     var addSqlParam = [this.props.dochtml, createTimer, this.props.author, this.props.title];
//     this.con.connect();
//     this.con.query(addSql, addSqlParam, function(err, result){
//         if(err){
//             console.log('[INSERT ERROR] - ',err.message);
//             return;
//         }
//         console.log('--------------------------INSERT----------------------------');
//         //console.log('INSERT ID:',result.insertId);
//         console.log('INSERT ID:',result);
//         console.log('-----------------------------------------------------------------\n\n');
//     })
//     callback();
//     return "success";
// }
// Doc.prototype.getDocItems = function(callback){
//     let _sql = "select * from sys_doc where id = ?"
//     let addSqlParam = [this.props.id];
//     this.con.connect();
//     this.con.query(_sql, addSqlParam, function(err, result){
//         if(err){
//             console.log('[INSERT ERROR] - ',err.message);
//             return;
//         }
//         console.log(result);
//         callback(result);
//     })
// }
// Doc.getAllDocTitle = function(callback){
//     let _sql = "select title from sys_doc";
//     this.con.connect();
//     this.con.query(_sql, function(err, result){
//         if(err){
//             console.log('[INSERT ERROR] - ',err.message);
//             return;
//         }
//         console.log(result)
//         callback(result);
//     })
// }
// function handleDisconnect(connection) {
//   connection.on("error", function(err) {
//     if (!err.fatal) {
//       return;
//     }
//     if (err.code !== "protocol_connection_lost") {
//       throw err;
//     }
//     console.log("re-connecting lost connection: " + err.stack);
//     connection = mysql.createconnection(connection.config);
//     handledisconnect(connection);
//     connection.connect();
//   });
// }
//module.exports = Doc;
