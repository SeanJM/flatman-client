function setStyle(node, a, b) {
  function style(name, value) {
    if (typeof VENDOR_PREFIX[name] === 'string') {
      name = VENDOR_PREFIX[name];
    }

    if (isNumber(value) && TO_PIXEL.indexOf(name) !== -1) {
      value += 'px';
    }

    node.style[name] = value;
  }

  if (isString(a) && isDefined(b)) {
    style(a, b);
  } else if (isString(a)) {
    node.setAttribute('style', a);
  } else if (isObject(a)) {
    for (var k in a) {
      style(k, a[k]);
    }
  }
}
