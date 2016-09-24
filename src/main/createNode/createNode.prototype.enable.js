CreateNode.prototype.enable = function () {
  this.node.removeAttribute('disabled');
  return this;
};
