let { updateShortIntro } = require('../models/user.db.js');
updateShortIntro({
  id: 20,
  intro: '李松野是一个爸爸'
},(err, rows)=>{
  if(err) console.log(err);
  console.log(rows);
})