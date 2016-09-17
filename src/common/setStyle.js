function style(node, name, value) {
  if (typeof style[name] === 'function') {
    node.style[name] = style[name](value);
  } else {
    node.style[name] = toPixel(name, value);
  }
}

style.transform = function (value) {
  var str = [];

  if (typeof value === 'object') {
    for (var k in value) {
      if (
        typeof value[k] === 'number'
        || typeof value[k] === 'string'
      ) {
        str.push(k + '(' + toPixel(k, value[k]) + ')');
      } else if (Array.isArray(value[k])) {
        str.push(
          k + '(' + value[k].map(partial(toPixel, k)).join(', ') + ')'
        );
      }
    }
    value = str.join(' ');
  }

  return value;
};

function setStyle(node, a, b) {
  if (typeof a === 'string' && isDefined(b)) {
    style(node, a, b);
  } else if (typeof a === 'string') {
    node.setAttribute('style', a);
  } else if (typeof a === 'object') {
    for (var k in a) {
      style(node, k, a[k]);
    }
  }
}
