(function () {

  function renderNode(node, n) {
    return '{tab}&lt;{tag}{attr}&gt;{children}{tab}&lt;/{tag}&gt;'.replace(/\{(\w+)}/g, function (a, b) {
      var x = [];
      var y;
      if (b === 'tag') {
        return node.node.tagName.toLowerCase();
      } else if (b === 'attr') {
        y = node.attr();
        for (var k in y) {
          x.push(k + '="' + y[k] + '"');
        }
        return x.length ? ' ' + x.join(' ') : '';
      } else if (b === 'children') {
        if (node.children()) {
          return node.children().map(function (c) {
            return renderNode(c, n + 1);
          }).join('');
        }
      }
      return '';
    });
  }

  // Test
  function Test () {
    var self = this;
  
    this.subscribers = {
      fail : [],
      pass : []
    };
  
    this.result = el('div', { class : 'result' },
      this.dot = el('div', { class : 'result_dot' }),
      this.title = el('div', { class : 'result_title'})
    );
  }
  
  Test.prototype.shouldEqual = function (right) {
    var status = el('div', { class : 'result_status' },
      el('div', { class : 'result_status_item result_status_item--expected'},
        el('div', { class : 'result_status_title'}, 'Expected'),
        el('div', { class : 'result_status_value'}, typeToString(right))
      ),
      el('div', { class : 'result_status_item result_status_item--actual'},
        el('div', { class : 'result_status_title'}, 'Actual'),
        el('div', { class : 'result_status_value'}, typeToString(this.left))
      )
    );
  
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
  

  window.startTest = startTest;
  
  // Node environment
  
  if (typeof module === 'object' && module.exports) {
    module.exports = startText;
  }
  

  function typeToString(res) {
    var type = Object.prototype.toString.call(res);
    var t;
    var a;
    if (type === '[object Text]') {
      return type + ': "' + res.nodeValue + '"';
    } else if (type === '[object Array]') {
      return '[\n' + res.map(function (a) {
        return '  ' + typeToString(a);
      }).join(',\n') + '\n]';
    } else if (type === '[object String]') {
      return '"' + res + '"';
    } else if (type === '[object Number]') {
      return res;
    } else if (res && res.node) {
      return renderNode(res, 0);
    } else if (type.indexOf('[object HTML') !== -1) {
      return renderNode(el(res), 0);
    } else if (type === '[object Object]') {
      t = '{';
      a = [];
      for (var k in res) {
        a.push('\n  ' + k + ' : ' + typeToString(res[k]));
      }
      t += a.join(',') + '\n}';
      return t;
    } else if (type === '[object Boolean]') {
      return res ? 'true' : 'false';
    }
  }

  function objectIsEqual(a, b) {
    if (a === b) {
      return a === b;
    } else {
      for (var k in a) {
        if (!isEqual(a[k], b[k])) {
          return false;
        }
      }
    }
    return true;
  }

  function arrayIsEqual(a, b) {
    var i = 0;
    var n = a.length;
  
    if (a.length === b.length) {
      for (; i < n; i++) {
        if (!isEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
  
    return false;
  }

  function isEqual(a, b) {
    if (typeof a === 'string' || typeof a === 'number' || typeof a === 'boolean') {
      return a === b;
    } else if (Array.isArray(a) && Array.isArray(b)) {
      return arrayIsEqual(a, b);
    } else if (typeof a === 'object' && typeof b === 'object') {
      return objectIsEqual(a, b);
    }
    return false;
  }

}());