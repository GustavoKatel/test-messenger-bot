const http = require('http')
const Bot = require('messenger-bot')

const UserController = require('./userController');

let bot = new Bot({
  token: process.env.MESSENGER_TOKEN,
  verify: process.env.MESSENGER_VERIFY,
  app_secret: process.env.MESSENGER_APP_KEY
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
console.log('Echo bot server running at port 3000.')
