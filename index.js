const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const config = require('./config/db');
const account = require('./routes/account');

const app = express();

const port = 3000;


//app.use(passport.session());

require('./config/passport')(passport);

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname,'public')));

mongoose.connect(config.db);

app.use(passport.initialize());

mongoose.connection.on('connected', ()=>{
  console.log("Мы успешно подключились к бд");
});

mongoose.connection.on('error', (err)=>{
  console.log("Мы не подключились к бд: " + err);
});

app.post('/api/registration',(req, res) =>{
  console.log(req.body);
  res.redirect('/');
});

app.use('/account', account);

app.listen(port,()=>{
  console.log("Сервер был запущен по порту: " + port);
});
