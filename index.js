const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config/db');
const account = require('./routes/account');
const programs = require('./routes/Programs');
const trainers = require('./routes/trainers');
const trace = require('./routes/trace');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(config.secret));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

mongoose.connect(config.db);

mongoose.connection.on('connected', () => {
    console.log("Мы успешно подключились к бд");
});

mongoose.connection.on('error', (err) => {
    console.log("Мы не подключились к бд: " + err);
});


app.use('/account', account);
app.use('/programs', programs);
app.use('/trainers', trainers);
app.use('/trace', trace);

app.listen(port, () => {
    console.log("Сервер был запущен по порту: " + port);
});
