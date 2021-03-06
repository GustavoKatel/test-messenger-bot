
const path = require('path');

var base = {

  debug: !(process.env.BOT_DEBUG === 'false'),

  root_url: '',

  messenger: {
    token: process.env.BOT_MESSENGER_TOKEN || '',
    verify: process.env.BOT_MESSENGER_VERIFY || '',
    app_id: process.env.BOT_MESSENGER_APP_ID || '',
    secret: process.env.BOT_MESSENGER_APP_SECRET || '',
    page_id: process.env.BOT_MESSENGER_PAGE_ID || ''
  }

};

var env_conf = path.join( __dirname, 'config.dev' );

if(!base.debug) {

  env_conf = path.join( __dirname, 'config.prod' );

}

module.exports = Object.assign({}, base, require(env_conf) );
