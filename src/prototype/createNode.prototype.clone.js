CreateNode.prototype.clone = function () {
  return createNode(this.node.cloneNode(true));
};
