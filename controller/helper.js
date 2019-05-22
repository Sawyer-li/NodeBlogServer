const crypto = require('crypto');
module.exports = {
  getTimeString: function(date){               
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  },
  //MD5加密
  getMD5: function(str){
    let md5 = crypto.createHash('md5');
    md5.update(str);
    return md5.digest('hex');
  },
  db_query(opt){
    opt.connect.query(opt.sql, function(err, res){
      if(err){
        console.log(opt.name+" err:"+err);
      }else{
        if(typeof(opt.callback) === 'function'){
          opt.callback(err, res);
        } 
      }
    })
  }
}
