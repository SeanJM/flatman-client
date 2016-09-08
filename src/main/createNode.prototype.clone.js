CreateNode.prototype.clone = function () {
  return createEl(this.node.cloneNode(true));
};
