const http = require('http')
const Bot = require('messenger-bot')

const config = require('./config');

let bot = new Bot({
  token: config.messenger.token,
  verify: config.messenger.verify,
  app_secret: config.messenger.secret
})

bot.on('error', (err) => {
  console.log(err.message)
})

bot.on('message', (payload, reply) => {
  console.log(payload);

  let text = payload.message.text ? payload.message.text.replace('?', '!') : 'meh'

  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err

    reply({ text }, (err) => {
      if (err) throw err

      console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
    })
  })
})

http.createServer(bot.middleware()).listen(process.env.PORT || 3000);
