'use strict';
/*
 * MAC calculation tool (for DIBS Payment Services)
 */

const crypto = require('crypto');


module.exports = {
  /*
   * Calculates the MAC key to authenticate the request
  */
  calculateMAC (params, hmacKey) {
    let query = '';
    const keys = Object.keys(params).sort();

    // Form the querystring
    for(let i = 0; i < keys.length; i++) {
      query += '&' + keys[i] + '=' + encodeURIComponent(params[keys[i]]);
    }
    query = query.substr(1);

    // Encode with the hmac key
    const hmac = crypto.createHmac('sha256', hex2asc(hmacKey));
    const hash = hmac.update(query).digest('hex');
    return hash;
  }
};

/*
 * Converts an HEX String to ASCII
*/
function hex2asc (str) {
  let res = '';
  for (let b = 0; b < str.length; b += 2) {
    res += String.fromCharCode(parseInt(str.substr(b, 2), 16));
  }
  return res;
}
