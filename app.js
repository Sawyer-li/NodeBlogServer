const express = require('express');
const app = express();
const mysql = require('mysql');
const config = require('./config.js');
const session = require('express-session');
const con = mysql.createConnection(config.mysql);
const routes = require('./controller/router.js');
const api = require('./controller/api.js');

app.use(session({                                //session的设置
    name: 'connect_sesion',                      //会话的名称
    secret: 'keyboard pig',
    cookie: {maxAge: 600000000},  //200分钟   3个小时左右
    resave: false,
    saveUninitialized: true
}));
app.set('views','views');
app.set('view engine','ejs');
app.use(express.static('public'));
app.use('/',routes);
app.use('/api',api);

const server = app.listen(3000, function(){
  const port = server.address().port;
  console.log(port);
})
