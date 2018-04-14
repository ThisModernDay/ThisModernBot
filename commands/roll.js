
var lottoPick = Math.floor((Math.random() * 100) + 1);

module.exports.run = (bot, databaseFile, writeData, chatChannel, user, msg, cmd, args) => {
  var dice = Math.floor((Math.random() * 100) + 1);

  if(dice === lottoPick){
    bot.action(chatChannel, `${user.username} rolled ${dice}
      and Won the lotto! Awarded Points ${lottoPick}`);
    databaseFile[user.username].points += lottoPick;
    writeData(databaseFile);
    lottoPick = Math.floor((Math.random() * 100) + 1);
  }
  else {
    bot.say(chatChannel, `${user.username} rolled ${dice}.`);
  }
}



module.exports.help = {
  name: "roll",
  description: "rolls a dice for a random number 1 - 100 with a chance to win a random lotto.",
}
