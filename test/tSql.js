const mysql = require('mysql')
    config = require('../config').mysql;
this.con = mysql.createConnection(config);
this.con.connect();
this.con.query("select title from sys_doc",function(err, result){
    console.log(result[5].title);   
});
