const fs = require('fs'); // file system

module.exports.run = (bot, databaseFile, writeData, chatChannel, user, msg, cmd, args) => {
  bot.action(chatChannel, `${user.username} >help, >ft, >points, >roll, >social.`)
}

module.exports.help = {
  name : "help",
  description : "lists the commands for the bot"
}
