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
      this.node.appendChild(a[i].node);
    }
  } else {
    child = createNode.apply(null, a);
    this.node.appendChild(child.node);
  }

  return this;
};
