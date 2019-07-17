const _ = require("lodash");

//将一个对象所有key都转化为驼峰命名 只处理一层
exports.camelCaseObjKey = function(obj){
  var result = {};
  for(var key in obj){
    result[_.camelCase(key)] = obj[key];
  }
  return result;
}

//统计包括中文英文的字符串包括多少个字节
exports.strlen = function(str){
    var len = 0;
    for (var i=0; i<str.length; i++) { 
     var c = str.charCodeAt(i); 
    //单字节加1 
     if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) { 
       len++; 
     } 
     else { 
      len+=2; 
     } 
    } 
    return len;
}
