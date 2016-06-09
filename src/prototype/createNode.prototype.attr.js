CreateNode.prototype.attr = function () {
  var i = 0;
  var n = arguments.length;
  var a = new Array(n);

  for (; i < n; i++) {
    a[i] = arguments[i];
  }

  if (typeof a[0] === 'string' && typeof a[1] === 'string') {
    this._node_.setAttribute(property, value);
  } else if (typeof a[0] === 'string') {
    return this._node_.getAttribute(property);
  } else if (typeof a[0] === 'object') {
    setAttributes(this._node_, a[0]);
  } else if (!a.length) {
    return this._node_.attributes;
  }

  return this;
};
