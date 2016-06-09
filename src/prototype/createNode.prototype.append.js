CreateNode.prototype.append = function () {
  var n = arguments.length;
  var a = new Array(n);
  var i = 0;
  var child;

  for (; i < n; i++) {
    a[i] = arguments[i];
  }

  // Is a 'CreateNode' element
  if (a[0] instanceof CreateNode) {
    i = 0;
    for (; i < n; i++) {
      this._node_.appendChild(a[i]._node_);
    }
  } else {
    child = createNode.apply(null, a);
    this._node_.appendChild(child._node_);
  }

  return this;
};
