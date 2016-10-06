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

m('test/selenium-tests/', /\.js$/).forEach(function (a) {
  tests[path.basename(a).replace(/\.js$/, '')] = fs.readFileSync(a, 'utf8');
});

module.exports = new TinyTest(function (test) {
  var file = 'file://' + path.resolve('test/index.html');
  var list_promise = [];

  driver.get(file).then(function () {
    Promise.all([

      // Append
      driver
        .executeScript(tests.append)
        .then(function (out) {
          test('addClass')
            .this(out.left)
            .equal(out.right);
        }),

      // Append
      driver
        .executeScript(tests.append)
        .then(function (out) {
          test('append')
            .this(out.left)
            .equal(out.right);
        }),

      // attr
      driver
        .executeScript(tests.attr)
        .then(function (out) {
          test('attr')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.emptyAttr)
        .then(function (out) {
          test('attr (no arguments, returns an object)')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.children)
        .then(function (out) {
          test('children')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.childrenFirst)
        .then(function (out) {
          test('children (first)')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.childrenSlice)
        .then(function (out) {
          test('children (slice)')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.clone)
        .then(function (out) {
          test('clone')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.closest)
        .then(function (out) {
          test('closest')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.containsArray)
        .then(function (out) {
          test('contains (with array)')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.disable)
        .then(function (out) {
          test('disable')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.find)
        .then(function (out) {
          test('find')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.focus)
        .then(function (out) {
          test('focus')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.getSelector)
        .then(function (out) {
          test('getSelector')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.hasClass)
        .then(function (out) {
          test('hasClass')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.hasParent)
        .then(function (out) {
          test('hasParent')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.isDisabled)
        .then(function (out) {
          test('isDisabled')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.isVisible)
        .then(function (out) {
          test('isVisible')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.off)
        .then(function (out) {
          test('off')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.offset)
        .then(function (out) {
          test('offset')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.on)
        .then(function (out) {
          test('on')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.once)
        .then(function (out) {
          test('once')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.parent)
        .then(function (out) {
          test('parent')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.parents)
        .then(function (out) {
          test('parents')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.prepend)
        .then(function (out) {
          test('prepend')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.prependTo)
        .then(function (out) {
          test('prependTo')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.remove)
        .then(function (out) {
          test('remove')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.removeClass)
        .then(function (out) {
          test('removeClass')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.removeClassArray)
        .then(function (out) {
          test('removeClass (Array)')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.replaceWith)
        .then(function (out) {
          test('replaceWith')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.select)
        .then(function (out) {
          test('select')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.selectorPath)
        .then(function (out) {
          test('selectorPath')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.siblings)
        .then(function (out) {
          test('siblings')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.text)
        .then(function (out) {
          test('text')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.textNodes)
        .then(function (out) {
          test('textNodes')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.toggleClass)
        .then(function (out) {
          test('toggleClass')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.trigger)
        .then(function (out) {
          test('trigger')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.value)
        .then(function (out) {
          test('value')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.fn)
        .then(function (out) {
          test('fn')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.style)
        .then(function (out) {
          test('style (value, property)')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.style_object)
        .then(function (out) {
          test('style (object)')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.uncheck)
        .then(function (out) {
          test('uncheck')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.check)
        .then(function (out) {
          test('check')
            .this(out.left)
            .equal(out.right);
        }),

      driver
        .executeScript(tests.name)
        .then(function (out) {
          test('name')
            .this(out.left)
            .equal(out.right);
        }),

    ])
    .then(
      function () {
        test.done();
        driver.close();
      }
    )
    .catch(e => console.trace(e));
  });
});
