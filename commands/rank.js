module.exports.run = (bot, db, writeData, chan, user, msg, cmd, args) => {
  bot.action(chan, `${user.username} your current rank is ${db[user.username].rank}`);
}

module.exports.help = {
  name : "rank",
  description : "checks rank"
}
