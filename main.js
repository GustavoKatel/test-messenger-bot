'use strict'
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const Bot = require('messenger-bot');
const FB = require('fb');

const config = require('./config');

let bot = new Bot({
  token: config.messenger.token,
  verify: config.messenger.verify,
  app_secret: config.messenger.secret
});

FB.options({
    appId:          config.messenger.app_id,
    appSecret:      config.messenger.secret
});
FB.setAccessToken(config.messenger.token);

bot.on('error', (err) => {
  console.log(err.message)
})

bot.on('message', (payload, reply) => {
  console.log(payload);

  let text = payload.message.text ? payload.message.text.replace('?', '!') : 'meh'

  FB.api(payload.sender.id, { fields: ['id', 'name', 'profile_pic'] }, (profile) => {
    if(!profile || profile.error) {
     console.log(!profile ? 'error occurred' : profile.error);
     return;
    }

    console.log(profile);
    console.log(payload.sender);
    reply({ text }, (err) => {
      if (err) throw err;

      console.log(`Echoed back to id: ${profile.id} ${profile.first_name} ${profile.last_name}: ${text}`);
    });

  });
})

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/webhook', (req, res) => {
  return bot._verify(req, res);
})

app.post('/webhook', (req, res) => {
  bot._handleMessage(req.body);
  res.end(JSON.stringify({status: 'ok'}));
})

http.createServer(app).listen(process.env.PORT || 3000);
