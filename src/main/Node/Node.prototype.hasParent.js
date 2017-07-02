Node.prototype.hasParent = function (target) {
  var node = this.node;

  return Array.isArray(target)
    ? target.map(function (t) {
      return t.contains(node);
    })
    : target.contains(node);
};
