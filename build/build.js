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

concat([
  'test/src/scripts/renderNode.js',
  'test/src/scripts/Test/Test.js',
  'test/src/scripts/startTest.js',
  'test/src/scripts/exports.js',
  'test/src/scripts/typeToString.js',
  'test/src/scripts/isEqual/objectIsEqual.js',
  'test/src/scripts/isEqual/arrayIsEqual.js',
  'test/src/scripts/isEqual/isEqual.js',
], 'test/dist/startTest.js', function () {
  uglify('test/dist/startTest.js');
});
