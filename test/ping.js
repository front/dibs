var assert = require('assert');
var should = require('should');

var dibs = require('../dibs');
dibs.testMode = true;


describe('DIBS', function() {
  describe('pingSatellite()', function() {
    it('should return \'ACCEPT\'', function(done) {

      dibs.pingSatellite()
      .then(function (data) {
        assert(data);
        assert(data.status);
        data.status.should.be.equal('ACCEPT');
        done();
      },
      function (err) {
        throw err;
      });

    });
  });

  describe('pingSatellite() [wrong uri]', function() {
    it('should return error', function(done) {

      dibs.pingUri = 'https://example/';

      dibs.pingSatellite()
      .then(function (data) {
        throw new Error();
      },
      function (err) {
        assert(err);
        done();
      });

    });
  });
});
