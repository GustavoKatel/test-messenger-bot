const EventEmitter = require('events');
const FB = require('fb');

const config = require('../config');

FB.options({
    appId:          config.messenger.app_id,
    appSecret:      config.messenger.secret,
    Promise: Promise
});
FB.setAccessToken(config.messenger.token);


/**
* UserController
* Events:
*   - message -> (string: recipient, object: payload)
        the controller needs to send a message
*/
class UserController {

  constructor(userId) {
    this.userId = userId;
    this.profile = null;

    this.kb = {};

    this.evm = new EventEmitter();

    this.getProfile().then(res => {
      this.kb['name'] = res['first_name'];
    });

  }

  handle(payload, reply) {

    let text = payload.message.text;

    if(!text) return; // not yet

    this.extractData(text);
    var response = this.generateResponse(text);

    if(reply) {
      reply(response);
    }

  }

  on(ev, cb) {
    this.evm.on(ev, cb);
  }

  getProfile() {

    return new Promise((resolve, reject) => {

      if(!this.profile) {

        FB.api(this.userId).then(resolve).catch(reject);

      } else {
        resolve(this.profile);
      }

    });

  }

  extractData(text) {

    var groups = (/my name is (\w+)/i).exec(text);
    if(groups && groups.length > 1) {
      this.kb['name'] = groups[1];
    }

  }

  generateResponse(text) {

    var res = 'Can\'t understand that right now';

    // tries to find any 'hi', 'hey' or 'hello' followed by 0 or 2 words
    if(text.match(/^((?:hi)|(?:hey)|(?:hello))( \w+){0,2}$/i)) {
      res = 'Hi ' + ( this.kb['name'] ? this.kb['name'] : '☺️' );
    }

    // matches:
    //  * what's my name[?]
    //  * what is my name[?]
    //  * say my name[?]
    //  * my name[?]
    if(text.match(/(((what(('?s)|( is)))|(say)) )?my name\??/i)) {

      if(this.kb['name']) {
        res = `Your name is ${this.kb['name']}`;
      } else {
        res = 'Don\'t know your name yet. Why don\'t you tell me?';
      }

    }

    return { text: res };

  }

}

module.exports = UserController;
