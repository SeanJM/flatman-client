const path = require('path');
const fs = require('fs');
const m = require('match-file-utility');
const _ = require('lodash');
const tinyTest = require('tiny-test');
const webdriver = require('selenium-webdriver');

const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .withCapabilities(webdriver.Capabilities.chrome())
  .build();

const tests = {};

function testDriver(name, test) {
  return driver
    .executeScript(tests[name])
      .then(function (out) {
        test(name)
          .this(() => out.left)
          .isEqual(() => out.right);
      })
      .catch(function (err) {
        test(name)
          .this(() => true)
          .isEqual(() => err.stack);
      });
}

m('test/selenium-tests/', /\.js$/).forEach(function (a) {
  tests[path.basename(a).replace(/\.js$/, '')] = fs.readFileSync(a, 'utf8');
});

module.exports = tinyTest(function (test, load) {
  var file = 'file://' + path.resolve('test/index.html');

  return driver.get(file).then(function () {
    var list = [];

    Object.keys(tests).forEach(function (k) {
      list.push(testDriver(k, test));
    });

    Promise.all(list)
    .then(
      function () {
        driver.close();
        load();
      }
    )
    .catch(function (e) {
      driver.close();
      load();
    });
  });
});
