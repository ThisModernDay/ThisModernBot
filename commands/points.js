module.exports.run = (bot, db, writeData, chan, user, msg, cmd, args) => {
  if(db[user.username].points === 0){
    bot.action(chan, `${user.username} :( you don't have any points. `)
  }
  else {
    bot.action(chan, `${user.username}: You have ${db[user.username].points} points!`)
  }
}

module.exports.help = {
  name : "points",
  description : "gets points for individual user"
}
