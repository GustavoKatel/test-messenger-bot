const EventEmitter = require('events');
const FB = require('fb');

const config = require('../config');

FB.options({
    appId:          config.messenger.app_id,
    appSecret:      config.messenger.secret
});
FB.setAccessToken(config.messenger.token);


/**
* UserController <- EventEmitter
* Events:
*   - message -> (string: text): the controller needs to send a message
*/
class UserController extends EventEmitter {

  constructor(userId) {
    this.userId = userId;
    this.profile = {};

    FB.api(userId, (res) => {
      if(!res || res.error) {
       console.log(!res ? 'error occurred' : res.error);
       return;
      }

      this.profile = res;

    });

  }

  handle(payload, reply) {

    let text = payload.message.text ? payload.message.text.replace('?', '!') : 'meh'

    reply({ text });

  }

}

module.exports = UserController;
