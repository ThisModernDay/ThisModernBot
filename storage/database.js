const fs = require('fs');


module.exports = function write(databaseFile){
  fs.writeFile('./storage/db.json', JSON.stringify(databaseFile, null, 2), (err) =>{
    if (err) console.error(err);
  });
}
