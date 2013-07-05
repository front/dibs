'use strict';

/**
 * MAC calculation tool (for DIBS Payment Services)
*/
var crypto = require('crypto');

module.exports = {
  /**
   * Calculates the MAC key to authenticate the request
  */
  calculateMAC: function(params, hmacKey) {
    var query = '';
    var keys = Object.keys(params).sort();

    // Form the querystring
    for (var i = 0; i < keys.length; i++) {
      query += '&' + keys[i] + '=' + encodeURIComponent(params[keys[i]]);
    }
    query = query.substr(1);
    // console.log('X-QRY:', query);

    // Encode with the hmac key
    var hmac = crypto.createHmac('sha256', hex2asc(hmacKey));
    var hash = hmac.update(query).digest('hex');
    // console.log('X-MAC:', hash);

    return hash;
  }
};

/**
 * Converts an HEX String to ASCII
*/
function hex2asc(str) {
  var res = '';
  for (var b = 0; b < str.length; b += 2) {
    res += String.fromCharCode(parseInt(str.substr(b, 2), 16));
  }
  return res;
}
