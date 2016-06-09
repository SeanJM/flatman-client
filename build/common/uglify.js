var uglifyJs = require("uglify-js");
var fs = require('fs');

function uglify(filename) {
  var min = filename.split('.').slice(0, -1).join('.') + '.min.js';
  var res = uglifyJs.minify(filename);
  fs.writeFile(min, res.code);
}

module.exports = uglify;
