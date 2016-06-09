CreateNode.prototype.style = function () {
  var styles = window.getComputedStyle(this._node_);
  var i = 0;
  var n = arguments.length;
  var a = new Array(n);

  for (; i < n; i++) {
    a[i] = arguments[i];
  }

  if (typeof a[0] === 'string' && typeof a[1] === 'undefined') {
    return styles[a[0]];
  } else if (typeof a[0] === 'string' && typeof a[1] !== 'undefined') {
    setStyle(this._node_, a[0], a[1]);
  }

  if (typeof a[0] === 'object') {
    for (var k in a[0]) {
      setStyle(this._node_, k, a[0][k]);
    }
  }
};
