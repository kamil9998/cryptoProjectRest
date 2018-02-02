import sha256 from 'sha256';

const default_options = {
  recvWindow: 60000,
  useServerTime: false,
  reconnect: true,
  test: false,
  APISECRET: 'KgIdCmRuZ6w5HgvEdIJiO0D5hdUjGElEtiiacRb792xXpJmk2a9gLXf8UjVM5Yd3',
  APIKEY: 'GfvFC9SvBOf94Udft5s5p94EvZEETpiQzBpDbKFFbPsGxrzFlX9yi2kNyItLMH0c'
};
let options = default_options;
const userAgent = 'Mozilla/4.0 (compatible; Node Binance API)';
const contentType = 'application/x-www-form-urlencoded';
let info = {
  timeOffset: 0
};


export const signedRequest = function(url, data, callback, method = 'GET') {
    if ( !options.APISECRET ) console.log('signedRequest: Invalid API Secret');
    if ( !data ) data = {};
    data.timestamp = new Date().getTime() + info.timeOffset;
    if ( typeof data.symbol !== 'undefined' ) data.symbol = data.symbol.replace('_','');
    if ( typeof data.recvWindow === 'undefined' ) data.recvWindow = options.recvWindow;
    let query = Object.keys(data).reduce(function(a,k){a.push(k+'='+encodeURIComponent(data[k]));return a},[]).join('&');
    //let signature = crypto.createHmac('sha256', options.APISECRET).update(query).digest('hex'); // set the HMAC hash header
    let signature = sha256(options.APISECRET);
    console.log(signature);
    let opt = {
      url: url+'?'+query+'&signature='+signature,
      method: method,
      timeout: options.recvWindow,
      agent: false,
      headers: {
        'User-Agent': userAgent,
        'Content-type': contentType,
        'X-MBX-APIKEY': options.APIKEY
      }
    };
    request(opt, function(error, response, body) {
      if ( !callback ) return;
  
      if ( error )
        return callback( error, {} );
  
      if ( response && response.statusCode !== 200 )
        return callback( response, {} );
  
      return callback( null, JSON.parse(body) );
    });
  };

export const balanceData = function(data) {
    let balances = {};
    if ( typeof data === 'undefined' ) return {};
    if ( typeof data.balances === 'undefined' ) {
      console.log('balanceData error', data);
      return {};
    }
    for ( let obj of data.balances ) {
      balances[obj.asset] = {available:obj.free, onOrder:obj.locked};
    }
    return balances;
};