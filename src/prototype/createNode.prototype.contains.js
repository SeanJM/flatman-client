CreateNode.prototype.contains = function (target) {
  if (target instanceof CreateNode) {
    return this.node.contains(target._node_);
  }
  return this.node.contains(target);
};
