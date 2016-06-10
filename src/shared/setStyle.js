function setStyle(node) {
  var i = 0;
  var n = arguments.length;
  var a = new Array(n);

  function style(name, value) {
    if (JS_PROPERTY_TO_CSS.hasOwnProperty(name)) {
      name = JS_PROPERTY_TO_CSS[name];
    }

    if (typeof VENDOR_PREFIX[name] === 'string') {
      name = VENDOR_PREFIX[name];
    }

    if (isNumber(value) && TO_PIXEL.indexOf(name) !== -1) {
      value += 'px';
    }

    node.style[name] = value;
  }

  for (; i < n; i++) {
    a[i] = arguments[i];
  }

  if (isString(a[1]) && isUndefined(a[2])) {
    return window.getComputedStyle(node)[a[1]];
  } else if (isString(a[1]) && isDefined(a[2])) {
    style(a[0], a[1]);
  } else if (isObject(a[1])) {
    for (var k in a[0]) {
      setStyle(node, k, a[0][k]);
    }
  }
}
