const express = require('express');
const logger = require('./config/winston.js');
const test = require('./routes/test')
const db = require('./lib/db.js');



const app = express();

//app.use('/login', login);
//app.use('/join', join);
app.use('/test', test);
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());


app.listen(3000, function(){
    logger.info('[DASHCASH] Connected, 3000 port')

});


module.exports = app
