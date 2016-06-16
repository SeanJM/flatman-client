function StartTest (name, callback) {
  var self = this;

  this.passed = 0;
  this.failed = 0;

  this.test = el('div', { class : 'test-container' });

  el('h1', name).appendTo(this.test);

  callback(function (name, left) {
    var test = new Test();

    test.on('fail', function (result) {
      self.failed += 1;
      result.appendTo(self.test);
    });

    test.on('pass', function (result) {
      self.passed += 1;
      result.appendTo(self.test);
    });

    return test.run(name, left);
  });

  el('div', { class : 'test-results' },
    el('div', { class : 'test-results_failed' }, 'Failed: ' + this.failed),
    el('div', { class : 'test-results_passed' }, ' Passed: ' + this.passed)
  ).prependTo(this.test);

  el('div', { class : 'test-results_bar' },
    el('div', {
      class : 'test-results_bar_progress',
      style : 'width: ' + (this.passed / (this.failed + this.passed) * 100) + '%;'
    })
  ).prependTo(this.test);

  this.test.appendTo(document.body);
}

function startTest (name, callback) {
  return new StartTest(name, callback);
}
