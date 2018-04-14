module.exports.run = (bot, databaseFile, writeData, chatChannel, user, msg, cmd, args) => {
  let argsToMilli = (parseInt(args[1]) * 60 * 1000);
  if(args[0] === "set" && user.username === "thismodernday"){
    setInterval( function() {
      bot.action(chatChannel, "Twitter: @ReduxBot, YouTube: /thismodernday")
    }, argsToMilli);
  }
  if(args.length === 0 && user.username === "thismodernday"){
    bot.action(chatChannel, `hey boss you have to set a time interval remember...`);
  }
  else{
    bot.say(chatChannel, `${user.username} only my boss can use this feature!`);
  }
}
module.exports.help = {
  name : "social",
  description : "posts social media links at set interval"
}
