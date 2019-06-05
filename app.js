const express = require('express');
const app = express();
const mysql = require('mysql');
const { logger, log4use } = require('./tool/log'); 
const config = require('./config');
const session = require('express-session');
const bodyParser = require('body-parser');
const con = mysql.createConnection(config.mysql);
const api = require('./controller');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(session({               //session的设置
    name: 'connect_sesion',                      //会话的名称
    secret: 'keyboard pig',
    cookie: {maxAge: 600000000},  //200分钟   3个小时左右
    resave: false,
    saveUninitialized: true
}));

log4use(app);
app.set('views','views');
app.set('view engine','ejs');
app.use(express.static('public'));
app.use('/api',api);
const server = app.listen(3000, function(){
  const port = server.address().port;
  logger.info(`start listen to ${port}`);
})
