const EventEmitter = require('events');
const FB = require('fb');

const config = require('../config');

FB.options({
    appId:          config.messenger.app_id,
    appSecret:      config.messenger.secret
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

  /**
  * handle user inputs
  * @param {Facebook message payload} payload
  * @param {Function(Facebook message object)} reply
  */
  handle(payload, reply) {

    let text = payload.message.text;

    if(!text) return; // not yet

    this.extractData(text);
    this.generateResponse(text).then((response) => {

      if(reply) {
        reply(response);
      }

    }).catch(console.log);

  }

  /** wrapper to the EventEmmiter */
  on(ev, cb) {
    this.evm.on(ev, cb);
  }

  /**
  * Resolves the user profile from facebook
  * @returns {Promise}
  */
  getProfile() {

    return new Promise((resolve, reject) => {

      if(!this.profile) {

        FB.api(this.userId, (res) => {
          if(!res || res.error) {
           reject(!res ? 'error occurred' : res.error);
           return;
          }

          this.profile = res;
          resolve(res);

        });

      } else {
        resolve(this.profile);
      }

    });

  }

  /**
  * Extract data from the user texts
  * @param {String} text
  */
  extractData(text) {

    var groups = (/my name is (\w+)/i).exec(text);
    if(groups && groups.length > 1) {
      this.kb['name'] = groups[1];
    }

  }

  /**
  * Generate response from the user input
  * @param {String} text
  * @returns {Promise}
  */
  generateResponse(text) {

    return new Promise((resolve, reject) => {

      // tries to find any 'hi', 'hey' or 'hello' followed by 0 or 2 words
      if(text.match(/^((?:hi)|(?:hey)|(?:hello))( \w+){0,2}$/i)) {
        resolve({ text: 'Hi ' + ( this.kb['name'] ? this.kb['name'] : '☺️' )});
        return;
      }

      // matches:
      //  * what's my name[?]
      //  * what is my name[?]
      //  * say my name[?]
      //  * my name[?]
      //  * who am i[?]
      if(
          text.match(/(((what(('?s)|( is)))|(say)) )?my name\??/i) ||
          text.match(/who am i\??/i)
      ) {

        if(this.kb['name']) {
          resolve({ text: `Your name is ${this.kb['name']}` });
        } else {

          this.getProfile().then((profile) => {
            this.kb['name'] = profile['name'];
            res = `Your name is ${this.kb['name']}`;
            resolve({ text: res});
          }).catch(reject);

        }

        return;

      }

      // default answer
      var res = 'Can\'t understand that right now';
      resolve({ text: res });

    });

  }

}

module.exports = UserController;
