const express = require('express');
const router = express.Router();

router.get('/admin', function(req, res){
  res.send('后台管理页');        
})
module.exports = router;
