CreateNode.prototype.parent = function () {
  var p = this.node.parentNode;
  return isElement(p) ? el(p) : false;
};
