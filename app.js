const express = require('express');
// const session = require('express-session');
// const passport = require('passport');


const logger = require('./config/winston.js');
//const login = require('./routes/login.js');
//const join = require('./routes/join.js');
const test = require('./routes/test')



const app = express();

//app.use('/login', login);
//app.use('/join', join);
app.use('/test', test);


app.listen(3000, function(){
    logger.info('[app.js] Connected, 3000 port')

    // db.connectDB().then(conn => {
    //     conn.release()
    //     logger.info(conn)
    //     conn.query( constants.CHANGE_DEADLINE, function (err, result) {
    //     if(err) {
    //         throw err;
    //     }
    //     logger.info("deadline update!");
    //     });
    // }).catch(err => {
    //     conn.release()
    //     logger.error(err)
    // })
   //process.send('ready')
});


module.exports = app
