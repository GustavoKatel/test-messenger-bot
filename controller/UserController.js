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

  }

  handle(payload, reply) {

    let text = payload.message.text;

    if(!text) return; // not yet

    this.extractData(text);
    var response = this.generateResponse(text);

    reply(response);

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

    var groups = (/my name is (\w+)/).exec(text);
    if(groups && groups.length > 1) {
      this.kb['name'] = groups[1];
    }

  }

  generateResponse(text) {

    var res = 'Hey you';

    // tries to find a 'hi' followed by 0 or 2 words
    if(text.match(/^hi( \w+){0,2}$/)) {
      res = 'Hi ' + ( this.kb['name'] ? this.kb['name'] : '☺️' );
    }

    return { text: res };

  }

}

module.exports = UserController;
