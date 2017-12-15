'use strict';
/*
 * A simple wrapper for the [DIBS Payment Services](http://www.dibspayment.com/) API
 */

require('request').defaults({
  jar: false,
  pool: false
});
const request = require('request-promise-native');
const mac = require('./mac');


module.exports = {

  /*
   * Default HMAC Key to encode the requests
  */
  hmacKey: '',

  /*
   * JSON Endpoint for card authorizations
  */
  authorizeCardUri: 'https://api.dibspayment.com/merchant/v1/JSON/Transaction/AuthorizeCard',

  /*
   * This service performs the first part of a credit card transaction (the authorisation).
   * The authorisation includes credit and debit card control and reservation of
   * the required amount for later capture.
  */
  authorizeCard (options, hmacKey) {
    return this.dibsRequest(options, hmacKey, this.authorizeCardUri);
  },

  /*
   * JSON Endpoint for ticket creation
  */
  createTicketUri: 'https://api.dibspayment.com/merchant/v1/JSON/Transaction/CreateTicket',

  /*
   * This service performs a credit and debit card check and saves the credit card
   * information for recurring payments.
  */
  createTicket (options, hmacKey) {
    return this.dibsRequest(options, hmacKey, this.createTicketUri);
  },

  /*
   * JSON Endpoint for ticket authorizations
  */
  authorizeTicketUri: 'https://api.dibspayment.com/merchant/v1/JSON/Transaction/AuthorizeTicket',

  /*
   * Make a recurring payment using a ticket previously created via the
   * createTicket service.
  */
  authorizeTicket (options, hmacKey) {
    return this.dibsRequest(options, hmacKey, this.authorizeTicketUri);
  },

  /*
   * JSON Endpoint for capturing transactions
  */
  captureTransactionUri: 'https://api.dibspayment.com/merchant/v1/JSON/Transaction/CaptureTransaction',

  /*
   * The second part of any transaction is the capture process. Usually this take place
   * at the time of shipping the goods to the customer.
  */
  captureTransaction (options, hmacKey) {
    return this.dibsRequest(options, hmacKey, this.captureTransactionUri);
  },

  /*
   * JSON Endpoint for cancelling transactions
  */
  cancelTransactionUri: 'https://api.dibspayment.com/merchant/v1/JSON/Transaction/CancelTransaction',

  /*
   * The cancelTransaction service cancels an authorization. If the acquirer used
   * supports reversals, the system automatically sends one such along and thereby
   * releasing any reserved amounts.
  */
  cancelTransaction (options, hmacKey) {
    return this.dibsRequest(options, hmacKey, this.cancelTransactionUri);
  },

  /*
   * JSON Endpoint for refunding transactions
  */
  refundTransactionUri: 'https://api.dibspayment.com/merchant/v1/JSON/Transaction/RefundTransaction',

  /*
   * The refundTransaction service refunds a captured transaction and transfers the money
   * back to the card holders account.
  */
  refundTransaction (options, hmacKey) {
    return this.dibsRequest(options, hmacKey, this.refundTransactionUri);
  },

  /*
   * Ping satellite endpoint
  */
  pingUri: 'https://api.dibspayment.com/merchant/v1/JSON/Transaction/Ping',

  /*
   * The ping service checks if satellite system is up and running.
  */
  pingSatellite () {
    return request({
      uri: this.pingUri,
      json: true
    });
  },

  /*
   * Executes the https request to the DIBS server and fulfills the promise
   *  with the response JSON Object
  */
  dibsRequest (options, hmacKey, uri) {
    if(this.testMode) {
      options.test = true;
    }
    if(!hmacKey && !this.hmacKey) {
      throw new Error('Merchant\'s hmacKey is required');
    }

    // Calculate authentication code
    options.MAC = mac.calculateMAC(options, hmacKey || this.hmacKey);

    // Post data to DIBS
    return request.post({
      uri: uri,
      form: {
        request: JSON.stringify(options)
      },
      json: true
    });
  }
};
