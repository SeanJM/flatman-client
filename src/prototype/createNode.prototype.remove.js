CreateNode.prototype.remove = function () {
  if (isElement(this.node.parentNode)) {
    this.node.parentNode.removeChild(this.node);
  }
  return this;
};
