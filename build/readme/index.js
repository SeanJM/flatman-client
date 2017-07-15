const generate = require('./generate');
const exists = require('../lib/exists');

try {
  if (exists('test/index.js')) {
    let test = require('../../test/index.js');

    test.then(function (results) {
      try {
        generate(results);
      } catch (e) {
        console.trace(e);
      }
    });

  } else {
    generate();
  }
} catch (e) {
  console.trace(e);
}
