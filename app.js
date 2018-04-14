const fs = require('fs');
const tmi = require('tmi.js');
const options = require('./settings.js');
const bot = new tmi.client(options);
const writeData = require('./storage/database.js');

var databaseFile = JSON.parse(fs.readFileSync('./storage/db.json'));

var debug = true
var chatChannel = "thismodernday";


bot.commands = new Map()


fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  let cmdFiles = files.filter(f => f.split(".").pop() === "js");
  if (cmdFiles.length <= 0) {
    console.log("No Commands to load!");
    return;
  }

  console.log(`Loading ${cmdFiles.length} commands...`);
  cmdFiles.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${i + 1}: ${props.help.name} loaded!`);
    bot.commands.set(props.help.name, props);
  })
});

bot.connect();

bot.on("join", function(channel, username, self) {

  if (self) return;

  if (!databaseFile[username]) {
    databaseFile[username] = {
      visits: 1,
      points: 0,
      rank: null,
      level: 0,
      lastSent: "",
      quotes: []
    }
    bot.action(chatChannel, `${username} welcome to the stream!`)
  }

  if (databaseFile[username]) {
    databaseFile[username].visits++;
    bot.action(chatChannel, `${username} welcome back!`)
  }

  if (databaseFile[username].visits >= 0 && databaseFile[username].visits < 10) {
    databaseFile[username].rank = "straggler";
  }
  if (databaseFile[username].visits >= 10 && databaseFile[username].visits < 50) {
    databaseFile[username].rank = "newbie";
  }
  if (databaseFile[username].visits >= 50 && databaseFile[username].visits < 100) {
    databaseFile[username].rank = "regular";
  }
  if (databaseFile[username].visits >= 100) {
    databaseFile[username].rank = "dedicated";
  }
  
  writeData(databaseFile)
})

bot.on('chat', function(channel, user, message, self) {
  if (self) return;

  msg = message.toLowerCase();



  if (msg.startsWith(options.prefix)) {
    let content = msg.split(/\s+/g);
    let command = content[0];
    let args = content.slice(1);

    let cmd = bot.commands.get(command.slice(options.prefix.length));
    if (debug === true) {
      console.log(`COMMAND: ${command.slice(options.prefix.length)} \nARGS: ${args}`);
    }
    if (cmd) cmd.run(bot, databaseFile, writeData, chatChannel, user, msg, cmd, args);
    else bot.say(chatChannel, `${user.username} You must enter a valid command,
      type ${options.prefix}help for a list of commands`);
  } else {
    databaseFile[user.username].lastSent = msg;
    let curLevel = Math.floor(0.5 * Math.sqrt(databaseFile[user.username].points));
    databaseFile[user.username].points++;
    if (curLevel > databaseFile[user.username].level) {
      databaseFile[user.username].level = curLevel;
      bot.action(chatChannel, `${user.username} you just leveled up to level ${curLevel}`)
    }
    writeData(databaseFile)
  }
});
