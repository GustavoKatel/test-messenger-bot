
const chai = require('chai');

const assert = chai.assert;

const config = require('../config');

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

    // app id
    it('Should contain an app id string', function() {

      assert.typeOf(config.messenger.app_id, 'string');

    });

    it('App ID should not be empty', function() {

      assert.notEqual(config.messenger.app_id, '');

    });

    // page id
    it('Should contain a page id string', function() {

      assert.typeOf(config.messenger.page_id, 'string');

    });

    it('Page ID should not be empty', function() {

      assert.notEqual(config.messenger.page_id, '');

    });

  });

});
