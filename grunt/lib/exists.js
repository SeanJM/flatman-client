const path = require('path');
const fs = require('fs');

function exists(file) {
  var s = file.split(path.sep).filter(a => a.length);
  var i = 1;
  var n = s.length;


  for (; i < n; i++) {
    try {
      fs.statSync(s.slice(0, i).join(path.sep));
    } catch(e) {
      return false;
    }
  }

  return true;
}

module.exports = exists;
