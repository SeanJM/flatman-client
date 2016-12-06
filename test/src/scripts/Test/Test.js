// Test
function Test () {
  var self = this;

  this.subscribers = {
    fail : [],
    pass : []
  };

  this.result = el('div', { className : 'result' }, [
    this.dot = el('div', { className : 'result_dot' }),
    this.title = el('div', { className : 'result_title'})
  ]);
}

Test.prototype.shouldEqual = function (right) {
  var status = el('div', { className : 'result_status' }, [
    el('div', { className : 'result_status_item result_status_item--expected'}, [
      el('div', { className : 'result_status_title'}, 'Expected'),
      el('div', { className : 'result_status_value'}, typeToString(right))
    ]),
    el('div', { className : 'result_status_item result_status_item--actual'}, [
      el('div', { className : 'result_status_title'}, 'Actual'),
      el('div', { className : 'result_status_value'}, typeToString(this.left))
    ])
  ]);

  if (isEqual(this.left, right)) {
    this.result.addClass('result--pass');
    this.trigger('pass');
  } else {
    this.result.append(status);
    this.result.addClass('result--fail');
    this.trigger('fail');
  }
};

Test.prototype.trigger = function (name) {
  var self = this;

  this.subscribers[name].forEach(function (callback) {
    callback(self.result);
  });

  return this;
};

Test.prototype.on = function (name, callback) {
  this.subscribers[name].push(callback);
  return this;
};

Test.prototype.run = function (name, left) {
  this.left = left;
  this.title.text(name);
  return this;
};
