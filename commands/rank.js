module.exports.run = (bot, databaseFile, writeData, chatChannel, user, msg, cmd, args) => {
  bot.action(chatChannel, `${user.username} your current rank is ${databaseFile[user.username].rank}`);
}

module.exports.help = {
  name : "rank",
  description : "checks rank"
}
