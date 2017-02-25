function wrap(tagName, methods) {
  var component = el(tagName);
  var render = methods.render;

  if (!wrap.keyGuard) {
    wrap.tempElement = el('div');
    wrap.keyGuard = {};
    for (var k in wrap.tempElement) {
      if (typeof wrap.tempElement[k] === 'function') {
        wrap.keyGuard[k] = true;
      }
    }
  }

  for (var k in component) {
    if (typeof component[k] === 'function' && !methods[k] && !wrap.keyGuard[k]) {
      methods[k] = wrap.method(component, k);
    }
  }

  methods.render = function (props) {
    props.component = component;
    return render(props);
  }

  return methods;
}

wrap.method = function (self, method) {
  return function () {
    var i = 0;
    var n = arguments.length;
    var $arguments = new Array(n);
    var result;

    for (;i < n; i++) {
      $arguments[i] = arguments[i];
    }

    result = self[method].apply(self, $arguments);

    if (typeof result === 'undefined') {
      return self;
    }

    return result
  }
};