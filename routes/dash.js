const express = require('express');
const route = express.Router();
const bodyParser = require('body-parser');
const logger = require('../config/winston.js');
const util = require('../lib/util.js');
const mysql = require('mysql');
const crypto = require('crypto');
const Dash = require('dash');

route.use(bodyParser.json({limit : "50mb"}))
route.use(bodyParser.urlencoded({limit: "50mb", extended: false}))

route.get('/', function(req, res){
    logger.info("test")
    // res.writeHead(200,{'Content-Type':'text/html'}); // header 설정
      res.send(' request get successfully');
});

route.post('/test', function(req,res){
    logger.info('\n************************************************************************************************');
    const body = req.body;

    logger.info(JSON.stringify(body));
    res.json(body);
})


route.post('/transfer', function(req,res){
    const body = req.body;
    var mnemonic = body.mnemonic;
    var dest = body.dest+"";
    var dash = Number(body.dash);
    var offlineMode;
    if(typeof dash != 'number'){
      logger.info("[dash coin value is not number]")
    }

    try{
      const Dash = require('dash');
      const clientOpts = {
        network: 'testnet',
        wallet: {
          mnemonic: mnemonic,
          unsafeOptions: {
            skipSynchronizationBeforeHeight: 650000, // only sync from early-2022
          },
        },
      };
      const client = new Dash.Client(clientOpts);

      const sendFunds = async () => {
        const account = await client.getWalletAccount();

        const transaction = account.createTransaction({
          recipient: dest, // Testnet2 faucet
          satoshis: (dash*10000000), // 1 Dash
        });

        var  responseData = {code: '0000', result : {'transaction': transaction}};
        await res.send(responseData);
        return account.broadcastTransaction(transaction);

      };

      sendFunds()
        .then((d) => logger.info('Transaction broadcast!\nTransaction ID:', d))
        .catch((e) => logger.error('Something went wrong:\n', e))
        .finally(() => client.disconnect());

      // Handle wallet async errors
      client.on('error', (error, context) => {
        logger.error(`Client error: ${error.name}`);
        logger.error(JSON.stringify(context));
      });
    }catch(e){
      logger.error(JSON.stringify(e));
      var  responseData = {code: '9999', result : {'errorMsg': e.name}};
      res.send(responseData);
    } finally{
      logger.info('==========================================================');
    }
})


//===============================================================================
route.post('/createWallet', function(req, res){
    logger.info("dash test")
    const body = req.body;
    var mnemonic = null;
    var address ="";
    var offlineMode;
    if(!body.mnemonic){

      logger.info("[first request and make mnemonic]")
    }
    // create wallet


    const clientOpts = {
      network: 'testnet',
      wallet: {
        mnemonic: null, // this indicates that we want a new wallet to be generated
        // if you want to get a new address for an existing wallet
        // replace 'null' with an existing wallet mnemonic
        offlineMode: offlineMode,  // this indicates we don't want to sync the chain
        // it can only be used when the mnemonic is set to 'null'
      },
    };

    try{
      const client = new Dash.Client(clientOpts);

      const createWallet = async () => {
        const account = await client.getWalletAccount();

        mnemonic = client.wallet.exportWallet();
        address = account.getUnusedAddress();
        logger.info('Mnemonic:', mnemonic);
        logger.info('Unused address:', address.address);


        const connection = mysql.createConnection({
            host     : '127.0.0.1',
            port     : 3306,
            user     : 'root',
            password : 'passwd!!',
            database : 'test',
            multipleStatements : true
        });

        const salt = Math.round((new Date().valueOf() * Math.random())) + "change";
        const hashPassword = crypto.createHash("sha512").update( body.passwd).digest("hex");

        const HMnemonic = crypto.createHash("sha512").update(mnemonic+salt).digest("hex");

        const sql = 'insert into test (HMnemonic, passwd, Address, salt) values ' +
            '("' + HMnemonic + '","' + hashPassword + '","' + address.address + '","' + salt + '")';//testcode

        await connection.query(sql, function (err, result) {
            sync = false;
            if (err) {
                //에러처리 및 아이디 존재함을 알리는 곳
                // return을 어떤식으로 해서 앱 내에서 받을지는 고려사항임
                responseData = {
                    'resultDesc': 'failuer insert email user_tmp',
                    'email': req.body.email,
                    result: 'm_003'
                };
                responseDesc = "Error 발생 insert email to user_temp";
                throw err;
            }

            logger.info("Data inserted!");
        })



        var  responseData = await {code: '0000', result : {'mnemonic': mnemonic, 'address': address.address}};
        await res.send(responseData);
      };

      createWallet()
        .catch((e) => log.error('Something went wrong:\n', e))
        .finally(() => client.disconnect());

     var errMsg;
      // Handle wallet async errors
      client.on('error', (error, context) => {
        logger.error(`Client error: ${error.name}`);
        logger.error(context);
        errMsg = context;
      });
    }catch(e){
      logger.error(e);
      var  responseData = {code: '9999', result : {'errorMsg': e.name}};
      res.send(responseData);
    } finally{
      logger.info('==========================================================');

    }
});




// ===============================================================================================
route.post('/login', function(req, res){
    logger.info("dashCash login")
    const body = req.body;
    var mnemonic = body.mnemonic;
    var address ="";
    var offlineMode;
    var resultQuery;
    var  responseData;

    try{
       //.DB 조회
      if(!body.mnemonic){
        mnemonic = null;
        logger.info("[check passwd]")
        const hashPassword = crypto.createHash("sha512").update( body.passwd).digest("hex");
        const sql = "SELECT * from test where passwd=" + hashPassword;
        const connection = mysql.createConnection({
            host     : '127.0.0.1',
            port     : 3306,
            user     : 'root',
            password : 'passwd!!',
            database : 'test',
            multipleStatements : true
        });
        logger.info("=================== login_Start user : ===================");

        // const createWallet = async () => {

          try{
            connection.query(sql, function (err, result) {
                resultQuery = JSON.stringify(result);//쿼리 json으로 pop
                logger.info('resultQuery : '+result);
                // jsonObj = JSON.parse(resultQuery);//parsing
                // logger.info("1");
                // logger.info('jsonObj : '+jsonObj.toString());

                if (err || jsonObj[0] === undefined || jsonObj[0] === '' || jsonObj[0] == null) {
                    responseData = {'resultDesc': 'login email error : Email not Found', result: 'L_001'};
                    responseDesc = 'select Email fail in user';
                } else {
                  logger.info("1sadsda");
                    // querySalt = jsonObj[0].random;//random pop
                }
                logger.info(resultQuery);
            })
          } catch(e){
            console.log(e);
          }

          responseData = {code: '0000', result : {'mnemonic': "mnemonic", 'address': "address.address"}};
          res.send(responseData);
        // }








      }else{ //니모닉 로그인
        mnemonic = body.mnemonic
        logger.info("[check mnemonic]")
        const clientOpts = {
          network: 'testnet',
          wallet: {
            mnemonic: mnemonic, // this indicates that we want a new wallet to be generated
            // if you want to get a new address for an existing wallet
            // replace 'null' with an existing wallet mnemonic
            offlineMode: true,  // this indicates we don't want to sync the chain
            // it can only be used when the mnemonic is set to 'null'
          },
        };

        const client = new Dash.Client(clientOpts);

        const createWallet = async () => {
          const account = await client.getWalletAccount();

          mnemonic = client.wallet.exportWallet();
          address = account.getUnusedAddress();
          logger.info('Mnemonic:', mnemonic);
          logger.info('Unused address:', address.address);

          var  responseData = await {code: '0000', result : {'address': address.address}};
          await res.send(responseData);
        };

        createWallet()
          .catch((e) => log.error('Something went wrong:\n', e))
          .finally(() => client.disconnect());

       var errMsg;
        // Handle wallet async errors
        client.on('error', (error, context) => {
          logger.error(`Client error: ${error.name}`);
          logger.error(context);
          errMsg = context;
        });


      }

    }catch(e){
      logger.error(e);
      console.error(e);
      var  responseData = {code: '9999', result : {'errorMsg': e.name}};
      res.send(responseData);
    } finally{
      logger.info('==========================================================');

    }
});

module.exports = route
