module.exports.run = (bot, databaseFile, writeData, chatChannel, user, msg, cmd, args) => {
  if(databaseFile[user.username].quotes.length > 4){
    databaseFile[user.username].quotes.length = 4;
  }
  if(args[0] === "me" ){
    databaseFile[user.username].quotes.unshift(databaseFile[user.username].lastSent);
  }
  if(args[0] === "clear"){
    databaseFile[user.username].quotes = [];
  }
  if(databaseFile[user.username].quotes.length === 0){
    bot.action(chatChannel, `${user.username} you don't have any quotes :(`);
  }
  if(args.length === 0 && databaseFile[user.username].quotes.length > 0){
    bot.action(chatChannel, `${databaseFile[user.username].quotes[Math.floor(Math.random() * databaseFile[user.username].quotes.length)]} - ${user.username}`);
  }
  writeData(databaseFile);
}

module.exports.help = {
  name : "quote",
  description : "quotes your last sent message, or the message of a user you pass as an argument"
}
