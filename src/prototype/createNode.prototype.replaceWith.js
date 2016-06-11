CreateNode.prototype.replaceWith = function (newNode) {
  newNode = createNode(newNode);

  if (this.node.parentNode) {
    this.node.parentNode.replaceChild(newNode.node, this.node);
    return this;
  }

  this.node = withNode.node;
  return this;
};
