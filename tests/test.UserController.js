
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const assert = chai.assert;

const config = require('../config');

const UserController = require('../controller/UserController');

var testUserId = '100001805095914'; // Gustavo Sampaio

describe('UserController tests', function() {

  it('getProfile() promise should resolve, eventually, an object', function(done) {

    var uc = new UserController(testUserId);

    assert.eventually.typeOf(uc.getProfile(), 'object').notify(done);

  });

  it('getProfile() promise should resolve, eventually, a profile object containing a first_name', function(done) {

    var uc = new UserController(testUserId);

    assert.eventually.property(uc.getProfile(), 'name').notify(done);

  });

  it('getProfile() promise should resolve, eventually, the profile object of our testing user', function(done) {

    var uc = new UserController(testUserId);

    assert.eventually.propertyVal(uc.getProfile(), 'name', 'Gustavo Sampaio').notify(done);

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

    describe('Knowledgebase Tests', function() {

      it('Should extract the user name', function(done) {

        var uc = new UserController(testUserId);
        uc.handle({
          message: {
            text: 'My name is test'
          }
        }, (res) => {

          assert.property(uc.kb, 'name');
          assert.equal(uc.kb['name'], 'test');
          done();

        });

      });

      it('Should respond the user name if asked and if it\'s known', function(done) {

        var uc = new UserController(testUserId);
        uc.handle({
          message: {
            text: 'My name is test'
          }
        }, (res) => {

          uc.handle({
            message: {
              text: 'What is my name?'
            }
          }, (res) => {

            assert.property(res, 'text');
            assert.include(res['text'], 'test');
            done();

          });

        });

      });

      it('Should respond the user name if asked and if it\'s not known', function(done) {

        var uc = new UserController(testUserId);

        uc.handle({
          message: {
            text: 'What is my name?'
          }
        }, (res) => {

          assert.property(res, 'text');
          assert.include(res['text'], 'Gustavo Sampaio');
          done();

        });

      });

    });


  });

});
