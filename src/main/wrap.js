function wrap(tagName, methods) {
  var cTemp = el(tagName);
  var render = methods.render;
  var constructor = methods.constructor;

  if (!wrap.keyGuard) {
    wrap.tempElement = el('div');
    wrap.keyGuard = {};
    for (var k in wrap.tempElement) {
      if (typeof wrap.tempElement[k] === 'function') {
        wrap.keyGuard[k] = true;
      }
    }
  }

  // These are the methods bound the wrapped component, it's contextual 'this'
  for (var k in cTemp) {
    if (typeof cTemp[k] === 'function' && !methods[k] && !wrap.keyGuard[k]) {
      methods[k] = wrap.method(k);
    }
  }

  methods.constructor = function (props) {
    this.node = {
      component : el(tagName)
    };
    if (constructor) {
      constructor.call(this, props);
    }
  };

  methods.render = function (props) {
    return render.call(this, props);
  };

  return methods;
}

wrap.method = function (method) {
  return function () {
    var i = 0;
    var n = arguments.length;
    var $arguments = new Array(n);
    var result;

    for (;i < n; i++) {
      $arguments[i] = arguments[i];
    }

    result = this.node.component[method].apply(this.node.component, $arguments);

    if (typeof result === 'undefined') {
      return this;
    }

    return result;
  };
};