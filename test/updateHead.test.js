let User = require('../models/user.db.js');
const data = {
  id: 20,
  url: "thi12313s is a head url"
}
User.updateHead(data, function(err, data){
  console.log(data);
})
