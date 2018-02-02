const binance = require('node-binance-api');
const _ = require('lodash-node');
binance.options({
  'APIKEY':'GfvFC9SvBOf94Udft5s5p94EvZEETpiQzBpDbKFFbPsGxrzFlX9yi2kNyItLMH0c',
  'APISECRET':'KgIdCmRuZ6w5HgvEdIJiO0D5hdUjGElEtiiacRb792xXpJmk2a9gLXf8UjVM5Yd3'
});

exports.getAllAvailable = function(req, res, next) {
    
    binance.balance(function(error, balances) {
        let balanceArray = [];
        if ( typeof balances.ETH !== "undefined" ) {
            console.log("ETH balance: ", balances.ETH.available);
        }
        let help = _.mapValues(balances, function (key) { return (key.available) });
        console.log(help);
        res.send({ balances: balanceArray });
    });
}

exports.getPriceUsdt = function(req, res, next) {
    const price = binance.prices(req.params.currency, function(error, balances) {
        console.log(error);
    });
    console.log(price);

}