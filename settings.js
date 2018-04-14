const oAuthPass = require('./oAuthPass.js');
module.exports = {
  options: {
    debug: false
  },
  connection: {
    reconnect: true
  },
  identity: {
    username: "ThisModernBot",
    password: oAuthPass
  },
  channels: ["thismodernday"],
  prefix: ">"
};
