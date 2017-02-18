Node.prototype.replaceWith = function (newNode) {
  var onBody = this.hasParent(BODY);

  newNode = el(
    newNode.getNode().node
  );

  if (onBody) {
    unmount(this);
  }

  if (this.node.parentNode) {
    this.node.parentNode.replaceChild(newNode.node, this.node);
    return this;
  }

  this.node = newNode.node;
  return this;
};
