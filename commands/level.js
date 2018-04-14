module.exports.run = (bot, databaseFile, writeData, chatChannel, user, msg, cmd, args) => {
  bot.action(chatChannel, `${user.username} your current level is ${databaseFile[user.username].level}!`)
}

module.exports.help = {
  name : "level",
  description : "shows current level"
}
