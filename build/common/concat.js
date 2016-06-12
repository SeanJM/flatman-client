var Concat = require('concat-with-sourcemaps');
var fs = require('fs');

function write(output, content, sourceMap, callback) {
  var mapOutput = output.split('.').slice(0, -1).join('.') + '.map';

  fs.writeFile(output, content, callback);
  fs.writeFile(mapOutput, sourceMap);
}

function indent(res, chr) {
  return res
  .split('\n')
  .map(function (a) {
    return chr + a;
  })
  .join('\n') + '\n';
}

function getContents(files, callback) {
  var contents = [];
  var tab;

  function indentEach(a) {
    a.content = indent(a.content, tab);
  }

  function loop(i) {

    if (typeof files[i] === 'undefined') {
      i = 0;
      for (var n = contents.length; i < n; i++) {
        tab = /^\t+|^[ ]+/m.exec(contents[i].content);
        if (tab) {
          i = n;
          contents.forEach(indentEach);
        }
      }
      callback(contents);
    } else {
      fs.readFile(files[i], 'utf8', function (err, res) {
        if (err) {
          throw 'Missing file: \'' + files[i] + '\'';
        }

        contents.push({
          filename : files[i],
          content : res
        });

        loop(i + 1);
      });
    }
  }

  loop(0);
}


function concat(files, output, callback) {
  var c = new Concat(true, output, '\n');

  c.add(null, '(function () {\n');

  getContents(files, function (contents) {
    contents.forEach(function (opt) {
      c.add(opt.filename, opt.content);
    });

    c.add(null, '}());');

    write(output, c.content, c.sourceMap, callback);
  });
}

module.exports = concat;
