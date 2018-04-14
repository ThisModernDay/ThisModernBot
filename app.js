const fs = require('fs'); // file system
const tmi = require('tmi.js'); // twitch message interpreter
const options = require('./settings.js'); // settings for tmi
const bot = new tmi.client(options); // creates bot client
const writeData = require('./storage/database.js'); // function wrapper for data

//setup json file for embedded db
var db = JSON.parse(fs.readFileSync('./storage/db.json'));

var debug = true; // true: shows commands and args in console
var chan = "thismodernday"; // sets channel


bot.commands = new Map()

// File system to load commands.
fs.readdir("./commands/", (err, files) => {
  if(err) console.error(err);
  // finds all files that are js files and ignores all other file types.
  let cmdFiles = files.filter(f => f.split(".").pop() === "js");
  // Returns if there are no js files found.
  if(cmdFiles.length <= 0){
    console.log("No Commands to load!");
    return;
  }

  console.log(`Loading ${cmdFiles.length} commands...`);
  //checks every js file in the commands dir and sets it in the map.
  cmdFiles.forEach((f,i) => {
    let props = require(`./commands/${f}`);
    console.log(`${i + 1}: ${props.help.name} loaded!`);
    bot.commands.set(props.help.name, props);
  })
});

bot.connect(); // connects bot to server

bot.on("join", function (channel, username, self) {

  if(self) return; // if bot joins channel ignore it
  // if database doesn't contain entry for a user create one.
  if(!db[username]){
    db[username] = {
      visits: 1,
      points: 0,
      rank: null,
      level: 0,
      lastSent: "",
      quotes: []
    }
    bot.action(chan, `${username} welcome to the stream!`)
  }
  // if user has an entry in database increase its visit count
  if(db[username]){
    db[username].visits++;
    bot.action(chan, `${username} welcome back!`)
  }
  // sets rank based on visits
  if(db[username].visits >= 0 && db[username].visits < 10) {
    db[username].rank = "straggler";
  }
  if(db[username].visits >= 10 && db[username].visits < 50) {
    db[username].rank = "newbie";
  }
  if(db[username].visits >= 50 && db[username].visits < 100) {
    db[username].rank = "regular";
  }
  if(db[username].visits >= 100) {
    db[username].rank = "dedicated";
  }
  //write to the database otherwise the information is just stored in memory
  writeData(db)
})

bot.on('chat', function(channel, user, message, self){
  if(self) return;

  msg = message.toLowerCase();



  if(msg.startsWith(options.prefix)){
    let content = msg.split(/\s+/g);
    let command = content[0];
    let args = content.slice(1);

    let cmd = bot.commands.get(command.slice(options.prefix.length));
    if(debug === true){
      console.log(`COMMAND: ${command.slice(options.prefix.length)} \nARGS: ${args}`);
    }
    if(cmd) cmd.run(bot, db, writeData, chan, user, msg, cmd, args);
    else bot.say(chan, `${user.username} You must enter a valid command,
      type ${options.prefix}help for a list of commands`);
    }
    else{
      db[user.username].lastSent = msg;
      let curLevel = Math.floor(0.5 * Math.sqrt(db[user.username].points));
      db[user.username].points++;
      if(curLevel > db[user.username].level){
        db[user.username].level = curLevel;
        bot.action(chan, `${user.username} you just leveled up to level ${curLevel}`)
      }
      writeData(db)
    }
  });
