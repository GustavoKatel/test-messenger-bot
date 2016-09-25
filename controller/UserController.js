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
*   - message -> (string: text): the controller needs to send a message
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

    reply({ text });

  }

  on(ev, cb) {
    this.evm.on(ev, cb);
  }

  getProfile() {

    return new Promise((resolve, reject) => {

      if(!this.profile) {

        // console.log(FB.api(this.userId));
        FB.api(this.userId).then(resolve).catch(reject);

      } else {
        resolve(this.profile);
      }

    });

  }

}

module.exports = UserController;
