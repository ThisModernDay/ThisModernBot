module.exports.run = (bot, db, writeData, chan, user, msg, cmd, args) => {
  if(db[user.username].quotes.length > 4){
    db[user.username].quotes.length = 4;
  }
  if(args[0] === "me" ){
    db[user.username].quotes.unshift(db[user.username].lastSent);
  }
  if(args[0] === "clear"){
    db[user.username].quotes = [];
  }
  if(db[user.username].quotes.length === 0){
    bot.action(chan, `${user.username} you don't have any quotes :(`)
  }
  if(args.length === 0 && db[user.username].quotes.length > 0){
    bot.action(chan, `${db[user.username].quotes[Math.floor(Math.random() * db[user.username].quotes.length)]} - ${user.username}`);
  }
  writeData(db);
}

module.exports.help = {
  name : "quote",
  description : "quotes your last sent message, or the message of a user you pass as an argument"
}
