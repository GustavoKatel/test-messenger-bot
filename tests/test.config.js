
var chai = require('chai');

var assert = chai.assert;

var config = require('../config');

describe('Configuration module tests', function() {

  it('Should contain a root_url', function() {

    assert.typeOf(config.root_url, 'string');

    assert.notEqual(config.root_url, '');

  });

  describe('Test Messenger configuration', function() {

    // base object
    it('Should be an object', function() {

      assert.typeOf(config.messenger, 'object');

    });

    // token
    it('Should contain a string token', function() {

      assert.typeOf(config.messenger.token, 'string');

    });

    it('Token should not be empty', function() {

      assert.notEqual(config.messenger.token, '');

    });

    // verify key
    it('Should contain a verify string', function() {

      assert.typeOf(config.messenger.verify, 'string');

    });

    it('Verify should not be empty', function() {

      assert.notEqual(config.messenger.verify, '');

    });

    // secret
    it('Should contain a secret string', function() {

      assert.typeOf(config.messenger.secret, 'string');

    });

    it('Secret should not be empty', function() {

      assert.notEqual(config.messenger.secret, '');

    });

  });

});
