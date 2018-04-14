module.exports.run = (bot, databaseFile, writeData, chatChannel, user, msg, cmd, args) => {
  if(databaseFile[user.username].points === 0){
    bot.action(chatChannel, `${user.username} :( you don't have any points. `)
  }
  else {
    bot.action(chatChannel, `${user.username}: You have ${databaseFile[user.username].points} points!`)
  }
}

module.exports.help = {
  name : "points",
  description : "gets points for individual user"
}
