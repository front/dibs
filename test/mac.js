var assert = require('assert');
var should = require('should');

var mac = require('../mac');

var testKey = '355268706425356d5f54676821744336' +
              '334a6f6a36336345592e26574a543370' +
              '422537317e3e766f2e56512576335958' +
              '6e6a304b7150426235635a48402a7627';

describe('MAC Calculculator', function() {
  describe('calculateMAC()', function() {
    it('it should calculate params hash (1)', function(done) {
      var params = {
        amount: 100,
        orderId: '1234567890',
        merchant: '1234567',
        currency: 'DKK',
        test: true
      }
      var hash = mac.calculateMAC(params, testKey);
      should.exist(hash);
      hash.should.be.equal('bae8ad8c4472af2c49d33a7a39f6744a405a0bc180a01558cdb1bee01f72b341');
      done();
    });

    it('it should calculate params hash (2)', function(done) {
      var params = {
        orderId: '123456',
        merchantId: '123456789',
        clientIp: '127.0.0.1',
        cardNumber: '1234567890123456',
        cvc: 684,
        currency: 'EUR',
        amount: 5000
      };
      var hash = mac.calculateMAC(params, testKey);
      should.exist(hash);
      hash.should.be.equal('1f0302fb92ea68237c3806a61619d713ca5ac983b805e78f505d862d1d3a498d');
      done();
    });

  });
});
