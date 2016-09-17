function style(node, name, value) {
  if (isNumber(value) && TO_PIXEL.indexOf(name) !== -1) {
    value += 'px';
  }
  node.style[name] = value;
}

function setStyle(node, a, b) {
  if (typeof a === 'string' && isDefined(b)) {
    style(node, a, b);
  } else if (typeof a === 'string') {
    node.setAttribute('style', a);
  } else if (isObject(a)) {
    for (var k in a) {
      style(node, k, a[k]);
    }
  }
}
