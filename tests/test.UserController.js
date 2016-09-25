
const chai = require('chai');

const assert = chai.assert;

const config = require('../config');

const UserController = require('../controller/UserController');

var testUserId = '100001805095914';

describe('UserController tests', function() {


  it('getProfile() promise should resolve, eventually, an object', function() {

    var uc = new UserController(testUserId);

    assert.eventually.typeOf(uc.getProfile(), 'object');

  });

  it('getProfile() promise should resolve, eventually, an profile object containing an first_name', function() {

    var uc = new UserController(testUserId);

    assert.eventually.property(uc.getProfile(), 'first_name');

  });

  describe('handle() tests', function() {

    it('Should reply an object', function() {

      var uc = new UserController(testUserId);

      uc.handle({
        message: {
          text: 'this is a test'
        }
      }, (res) => {

        assert.typeOf(res, 'object');

      });

    });

    it('Should reply an object with property "text"', function() {

      var uc = new UserController(testUserId);

      uc.handle({
        message: {
          text: 'this is a test'
        }
      }, (res) => {

        assert.property(res, 'text');

      });

    });

    it('Should reply an object with a string property "text"', function() {

      var uc = new UserController(testUserId);

      uc.handle({
        message: {
          text: 'this is a test'
        }
      }, (res) => {

        assert.typeOf(res.text, 'string');

      });

    });


  });

});
