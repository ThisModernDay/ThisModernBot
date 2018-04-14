module.exports.run = (bot, db, writeData, chan, user, msg, cmd, args) => {
  let argsToMilli = (parseInt(args[1]) * 60 * 1000);
  if(args[0] === "set" && user.username === "thismodernday"){
    setInterval( function() {
      bot.action(chan, "Twitter: @ReduxBot, YouTube: /thismodernday")
    }, argsToMilli);
  }
  if(args.length === 0 && user.username === "thismodernday"){
    bot.action(chan, `hey boss you have to set a time interval remember...`);
  }
  else{
    bot.say(chan, `${user.username} only my boss can use this feature!`);
  }
}
module.exports.help = {
  name : "social",
  description : "posts social media links at set interval"
}
