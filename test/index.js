const path = require('path');
const fs = require('fs');
const m = require('match-file-utility');
const _ = require('lodash');
const TinyTest = require(path.resolve('grunt/tinyTest'));
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
          .this(out.left)
          .equal(out.right);
      })
      .catch(function (err) {
        test(name)
          .this(true)
          .equal(err.stack);
      });
}

m('test/selenium-tests/', /\.js$/).forEach(function (a) {
  tests[path.basename(a).replace(/\.js$/, '')] = fs.readFileSync(a, 'utf8');
});

module.exports = new TinyTest(function (test) {
  var file = 'file://' + path.resolve('test/index.html');
  var list_promise = [];

  driver.get(file).then(function () {
    Promise.all([

      // Append
      testDriver('append', test),
      testDriver('before', test),
      testDriver('attr', test),
      testDriver('emptyAttr', test),
      testDriver('children', test),
      testDriver('childrenFirst', test),
      testDriver('childrenSlice', test),
      testDriver('clone', test),
      testDriver('closest', test),
      testDriver('containsArray', test),
      testDriver('disable', test),
      testDriver('find', test),
      testDriver('focus', test),
      testDriver('getSelector', test),
      testDriver('hasClass', test),
      testDriver('hasParent', test),
      testDriver('isDisabled', test),
      testDriver('isVisible', test),
      testDriver('off', test),
      testDriver('offset', test),
      testDriver('on', test),
      testDriver('once', test),
      testDriver('parent', test),
      testDriver('parents', test),
      testDriver('prepend', test),
      testDriver('prependTo', test),
      testDriver('remove', test),
      testDriver('removeClass', test),
      testDriver('removeClassArray', test),
      testDriver('replaceWith', test),
      testDriver('select', test),
      testDriver('selectorPath', test),
      testDriver('siblings', test),
      testDriver('scrollWidth', test),
      testDriver('text', test),
      testDriver('textNodes', test),
      testDriver('toggleClass', test),
      testDriver('trigger', test),
      testDriver('value', test),
      testDriver('fn', test),
      testDriver('style', test),
      testDriver('style_object', test),
      testDriver('uncheck', test),
      testDriver('check', test),
      testDriver('name', test),
      testDriver('component', test),
      testDriver('componentWithClassAndChildren', test),
      testDriver('componentWithRenderMethod', test),
      testDriver('componentWithNames', test),
    ])
    .then(
      function () {
        test.done();
        driver.close();
      }
    )
    .catch(function (e) {
      console.trace(e);
      driver.close();
    });
  });
});
