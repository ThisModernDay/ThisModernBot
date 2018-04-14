const fs = require('fs'); // file system

module.exports.run = (bot, db, writeData, chan, user, msg, cmd, args) => {
  bot.action(chan, `${user.username} >help, >ft, >points, >roll, >social.`)
}

module.exports.help = {
  name : "help",
  description : "lists the commands for the bot"
}
