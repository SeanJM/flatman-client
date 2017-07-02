Node.prototype.hasParent = function (target) {
  var node = this.node;

  return Array.isArray(target)
    ? target.map(function (t) {
      return t.node.contains(node);
    })
    : target.node.contains(node);
};
