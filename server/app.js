const express = require('express');
const logger = require('./config/winston.js');
const dashRouter = require('./routes/dash');
const db = require('./lib/db.js');
const PORT = 8080;

const app = express();

//app.use('/login', login);
//app.use('/join', join);

app.get('/', function (req, res) {
  logger.info('test');
  // res.writeHead(200,{'Content-Type':'text/html'}); // header 설정
  res.status(200).send('request get successfully');
});

app.use('/dash', dashRouter);
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());

app.listen(PORT, function () {
  logger.info(`Dash&Cash Server Connected, ${PORT} port`);
});

module.exports = app;
