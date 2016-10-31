CreateNode.prototype.style = function (a, b) {
  if (a && b || typeof a === 'object') {
    setStyle(this.node, a, b);
    return this;
  } else if (typeof a === 'string' || typeof a === 'undefined') {
    return getStyle(this.node, a);
  }
  throw 'Invalid arguments for method \'style\'';
};
