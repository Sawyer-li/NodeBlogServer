const mysql = require('mysql'),
config = require('../config').mysql;
 
let User = function(user){
  if(user){
    this.props = user.props
    this.con;
  }else{
    return "noProps" 
  }
}
User.prototype.init = function(){
  this.con = mysql.createConnection(config);
  handledisconnect(this.con);
  return 'success';
}


User.prototype.addUser = function(callback){
  let _sql = "insert ";
  let addSql = 'INSERT sys_user(username,password,create_time) VALUES(?,?,?)';
  let registerTime = new Date();
  var addSqlParam = [this.props.name,this.props.password,registerTime];
  this.con.connect();
  this.con.query(addSql,addSqlParam, function(err,result){
    if(err){
        console.log('[INSERT ERROR] - ',err.message);
        return;
    }        
    return "success"
    console.log('--------------------------INSERT----------------------------');
    //console.log('INSERT ID:',result.insertId);        
    console.log('INSERT ID:',result);        
    console.log('-----------------------------------------------------------------\n\n');         
  })
  //con.end();
}

User.prototype.getUserAllItems = function(callback){
  let _sql = "select * from sys_user where username = ?";
  var addSqlParam = [this.props.name];
  this.con.connect();
  this.con.query(_sql, addSqlParam, function(err,result){
    if(err){
        console.log('[INSERT ERROR] - ',err.message);
        return;
    }        
    console.log(result);
    callback(result);
  })
}
function handledisconnect(connection) {
    connection.on('error', function(err) {
        if (!err.fatal) {
          return;
        }

        if (err.code !== 'protocol_connection_lost') {
          throw err;
        }

        console.log('re-connecting lost connection: ' + err.stack);

        connection = mysql.createconnection(connection.config);
        handledisconnect(connection);
        connection.connect();
  });
}

module.exports = User;
