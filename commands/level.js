module.exports.run = (bot, db, writeData, chan, user, msg, cmd, args) => {
  bot.action(chan, `${user.username} your current level is ${db[user.username].level}!`)
}

module.exports.help = {
  name : "level",
  description : "shows current level"
}
