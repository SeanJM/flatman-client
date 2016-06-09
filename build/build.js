var concat = require('../build/common/concat.js');
var uglify = require('../build/common/uglify.js');
var matchFile = require('match-file-utility');

var files = [];

files = files.concat('src/variables.js');
files = files.concat(matchFile('src/utilities/', /\.js$/));
files = files.concat(matchFile('src/shared/', /\.js$/));
files = files.concat(matchFile('src/prototype/', /\.js$/));
files = files.concat('src/exports.js');

concat(files, 'createNode.js', function () {
  uglify('createNode.js');
});
