let {addUser} = require('../models/user.db.js');
addUser({
  name: "lidong12ye121", 
  password: "aixiaoyao",
  email: "13894712059112377@163.com"
},(err, rows)=>{
  if(err) console.log(err);
  console.log(rows);
})