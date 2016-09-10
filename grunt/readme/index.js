const path = require('path');
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json'));
const config = pkg.gruntBuild;
const generate = require('./generate');

const exists = require('../lib/exists');

function task(callback) {
  if (config.isProduction) {
    try {
      const tinyTest = exists('test/index.js')
      ? require(path.resolve('test/'))
      : undefined;

      if (typeof tinyTest === 'object') {
        tinyTest.silence();
        tinyTest.then(function (test_results) {
          generate(test_results, callback);
        });
      } else {
        generate(undefined, callback);
      }
    } catch(e) {
      console.trace(e);
    }
  } else {
    callback();
  }
}

module.exports = {
  glob : ['src/readme/**/*.md'],
  task : task
};
