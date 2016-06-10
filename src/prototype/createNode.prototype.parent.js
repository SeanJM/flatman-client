CreateNode.prototype.parent = function () {
  return new CreateNode(this.node.parentNode);
};
