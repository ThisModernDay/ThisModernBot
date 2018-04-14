
var lottoPick = Math.floor((Math.random() * 100) + 1);

module.exports.run = (bot, db, writeData, chan, user, msg, cmd, args) => {
  var dice = Math.floor((Math.random() * 100) + 1);

  if(dice === lottoPick){
    bot.action(chan, `${user.username} rolled ${dice}
      and Won the lotto! Awarded Points ${lottoPick}`);
    db[user.username].points += lottoPick;
    writeData(db);
    lottoPick = Math.floor((Math.random() * 100) + 1);
  }
  else {
    bot.say(chan, `${user.username} rolled ${dice}.`);
  }
}



module.exports.help = {
  name: "roll",
  description: "rolls a dice for a random number 1 - 100 with a chance to win a random lotto.",
}
