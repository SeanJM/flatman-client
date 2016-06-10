CreateNode.prototype.closest = function (selector) {
  return createNode(this.node.closest(selector));
};
