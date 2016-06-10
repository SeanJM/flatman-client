CreateNode.prototype.contains = function (target) {
  if (target instanceof CreateNode) {
    return this.node.contains(target.node);
  }
  return this.node.contains(target);
};
