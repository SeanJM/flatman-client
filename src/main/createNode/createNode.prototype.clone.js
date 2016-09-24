CreateNode.prototype.clone = function () {
  return el(this.node.cloneNode(true));
};
