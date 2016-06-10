function setStyle(node) {
  function style(name, value) {
    if (typeof VENDOR_PREFIX[name] === 'string') {
      name = VENDOR_PREFIX[name];
    }

    if (isNumber(value) && TO_PIXEL.indexOf(name) !== -1) {
      value += 'px';
    }

    node.style[name] = value;
  }

  if (isString(arguments[1]) && isUndefined(arguments[2])) {
    return window.getComputedStyle(node)[arguments[1]];
  } else if (isString(arguments[1]) && isDefined(arguments[2])) {
    style(arguments[1], arguments[2]);
  } else if (isObject(arguments[1])) {
    for (var k in arguments[1]) {
      setStyle(node, k, arguments[1][k]);
    }
  }
}
