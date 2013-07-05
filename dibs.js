'use strict';

/**
 * package dependencies
 */
var Promise = require('mpromise');
var request = require('request');
var mac = require('./mac');

request.defaults({
  jar: false,
  pool: false
});

module.exports = {
  /**
   * Sets the requests to test mode
  */
  testMode: false,

  /**
   * Default HMAC Key to encode the requests
  */
  hmacKey: '',

  /**
   * JSON Endpoint for card authorizations
  */
  authorizeCardUri: 'https://api.dibspayment.com/merchant/v1/JSON/Transaction/AuthorizeCard',

  /**
   * The service performs the first part of a credit card transaction (the authorisation).
   * The authorisation includes e.g. credit- and debit-card control and reservation of
   * the required amount for later capture.
  */
  authorizeCard: function(options, hmacKey, call) {
    var p = new Promise(call);
    this.dibsRequest(options, hmacKey, this.authorizeCardUri, p);
    return p;
  },

  /**
   * JSON Endpoint for ticket creation
  */
  createTicketUri: 'https://api.dibspayment.com/merchant/v1/JSON/Transaction/CreateTicket',

  /**
   * The service performs a credit- and debit-card check and saves the credit card
   * information for recurring payments.
  */
  createTicket: function(options, hmacKey, call) {
    var p = new Promise(call);
    this.dibsRequest(options, hmacKey, this.createTicketUri, p);
    return p;
  },

  /**
   * JSON Endpoint for ticket authorizations
  */
  authorizeTicketUri: 'https://api.dibspayment.com/merchant/v1/JSON/Transaction/AuthorizeTicket',

  /**
   * Make a recurring payment using a ticket previously created either via the
   * Payment Window or using the authorizeCard service.
  */
  authorizeTicket: function(options, hmacKey, call) {
    var p = new Promise(call);
    this.dibsRequest(options, hmacKey, this.authorizeTicketUri, p);
    return p;
  },

  /**
   * JSON Endpoint for capturing transactions
  */
  captureTransactionUri: 'https://api.dibspayment.com/merchant/v1/JSON/Transaction/CaptureTransaction',

  /**
   * The second part of any transaction is the capture process. Usually this take place
   * at the time of shipping the goods to the customer, and is normally accessed via
   * the DIBS administration interface.
  */
  captureTransaction: function(options, hmacKey, call) {
    var p = new Promise(call);
    this.dibsRequest(options, hmacKey, this.captureTransactionUri, p);
    return p;
  },

  /**
   * JSON Endpoint for cancelling transactions
  */
  cancelTransactionUri: 'https://api.dibspayment.com/merchant/v1/JSON/Transaction/CancelTransaction',

  /**
   * The cancelTransaction service cancels an authorization. If the acquirer used
   * supports reversals, the system automatically sends one such along and thereby
   * releasing any reserved amounts.
  */
  cancelTransaction: function(options, hmacKey, call) {
    var p = new Promise(call);
    this.dibsRequest(options, hmacKey, this.cancelTransactionUri, p);
    return p;
  },

  /**
   * JSON Endpoint for refunding transactions
  */
  refundTransactionUri: 'https://api.dibspayment.com/merchant/v1/JSON/Transaction/RefundTransaction',

  /**
   * The refundTransaction service refunds a captured transaction and transfers the money
   * back to the card holders account.
  */
  refundTransaction: function(options, hmacKey, call) {
    var p = new Promise(call);
    this.dibsRequest(options, hmacKey, this.refundTransactionUri, p);
    return p;
  },

  /**
   * Ping satellite endpoint
  */
  pingUri: 'https://api.dibspayment.com/merchant/v1/JSON/Transaction/Ping',

  /**
   * The ping service checks if satellite system is up and running.
  */
  pingSatellite: function(call) {
    var p = new Promise(call);
    request({uri: this.pingUri}, function(err, res, body) {
      if (err) {
        return p.reject(err);
      }
      p.fulfill(JSON.parse(body));
    });
    return p;
  },

  /**
   * Executes the https request to the DIBS server and fulfills the promise
   *  with the response JSON Object
  */
  dibsRequest: function(options, hmacKey, uri, p) {
    if (this.testMode) {
      options.test = true;
    }
    if(!hmacKey && !this.hmacKey) {
      return p.reject(new Error('Merchant\'s hmacKey is required'));
    }
    //Calculate authentication code
    options.MAC = mac.calculateMAC(options, hmacKey || this.hmacKey);
    // Post data to DIBS
    request.post({
      uri: uri,
      form: {
        request: JSON.stringify(options)
      }
    }, function(err, res, body) {
      if (err) {
        return p.reject(err);
      }
      if(res.statusCode === 423) {
        // TODO: handle script limits
      }
      try {
        p.fulfill(JSON.parse(body));
      }
      catch (err) {
        p.reject(err);
      }
    });
  }
};
