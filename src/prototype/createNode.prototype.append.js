CreateNode.prototype.append = function () {
  var n = arguments.length;
  var i = 0;
  for (; i < n; i++) {
    appendChild(this.node, arguments[i]);
  }
  return this;
};
