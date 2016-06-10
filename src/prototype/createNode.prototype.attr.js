CreateNode.prototype.attr = function () {
  var i = 0;
  var n = arguments.length;
  var a = new Array(n);

  for (; i < n; i++) {
    a[i] = arguments[i];
  }

  if (typeof a[0] === 'string' && typeof a[1] === 'string') {
    this.node.setAttribute(a[0], a[1]);
  } else if (typeof a[0] === 'string') {
    return this.node.getAttribute(a[0]);
  } else if (typeof a[0] === 'object') {
    setAttributes(this.node, a[0]);
  } else if (!a.length) {
    return this.node.attributes;
  }

  return this;
};
