var assert = require('assert');
var should = require('should');

var dibs = require('../dibs');
dibs.testMode = true;


describe('DIBS', function() {
  describe('pingSatellite()', function() {
    it('should return \'ACCEPT\'', function(done) {

      dibs.pingSatellite(function (err, data) {
        assert(!err);
        assert(data.status);
        data.status.should.be.equal('ACCEPT');
        done();
      });

    });
  });

  describe('pingSatellite() [wrong uri]', function() {
    it('should return error', function(done) {

      dibs.pingUri = 'https://example/';

      dibs.pingSatellite(function (err, data) {
        assert(err);
        assert(!data);
        done();
      });

    });
  });
});
