const express = require('express');
const route = express.Router();
const bodyParser = require('body-parser');
const logger = require('../config/winston.js');
const util = require('../lib/util.js');

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

route.post('/createWallet', function(req, res){
    logger.info("dash test")
    const body = req.body;
    var mnemonic = body.mnemonic;
    var offlineMode;
    if(!body.mnemonic){
      mnemonic = null;
      offlineMode = true;
      logger.info("[first request and make mnemonic]")
    }else{
      mnemonic = body.mnemonic
      offlineMode = true;
      logger.info("[not first request and check mnemonic]")
    }

// create wallet
    const Dash = require('dash');

    const clientOpts = {
      network: 'testnet',
      wallet: {
        mnemonic: mnemonic, // this indicates that we want a new wallet to be generated
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

        const mnemonic = client.wallet.exportWallet();
        const address = account.getUnusedAddress();
        console.log('Mnemonic:', mnemonic);
        console.log('Unused address:', address.address);
        console.log('=============================');
        var  responseData = await {code: '0000', result : {'mnemonic': mnemonic, 'address': address.address}};
        await res.send(responseData);
      };

      createWallet()
        .catch((e) => console.error('Something went wrong:\n', e))
        .finally(() => client.disconnect());

     var errMsg;
      // Handle wallet async errors
      client.on('error', (error, context) => {
        console.error(`Client error: ${error.name}`);
        console.error(context);
        errMsg = context;
      });
    }catch(e){
      var  responseData = {code: '9999', result : {'errorMsg': e.name}};
      res.send(responseData);
    }




});



module.exports = route
