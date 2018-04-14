const fs = require('fs');


module.exports = function write(db){
  fs.writeFile('./storage/db.json', JSON.stringify(db, null, 2), (err) =>{
    if (err) console.error(err);
  });
}
