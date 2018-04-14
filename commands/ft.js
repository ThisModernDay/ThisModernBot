var flips = ["(ﾉಥ益ಥ）ﾉ﻿ ┻━┻", "ʕノ•ᴥ•ʔノ ︵ ┻━┻", "(ノ ゜Д゜)ノ ︵ ┻━┻"];

module.exports.run = (bot, databaseFile, writeData, chatChannel, user, msg, cmd, args) => {
  if(user.username === "thismodernday"){
    bot.say(chatChannel, `${flips[Math.floor(flips.length * Math.random())]}`);
  }
  else {
    bot.action(chatChannel, `${user.username} only can flip his tables`);
  }
}

module.exports.help = {
  name : "ft",
  description : "flips tables"
}
