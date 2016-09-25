'use strict'
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const Bot = require('messenger-bot');
const FB = require('fb');

const config = require('./config');

const UserController = require('./controller/UserController');

var users = {};

let bot = new Bot({
  token: config.messenger.token,
  verify: config.messenger.verify,
  app_secret: config.messenger.secret
});

bot.on('error', (err) => {
  console.log(err.message)
});

bot.on('message', (payload, reply) => {

  var userId = payload.sender.id;

  if(!(userId in users)) {
    users[userId] = new UserController(userId);
    users[userId].on('message', (recipientId, payload) => {

      bot.sendMessage(recipientId, payload);

    });
  }

  users[userId].handle(payload, reply);

});

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
