Node.prototype.replaceWith = function (newNode) {
  unmount(this);

  if (this.node.parentNode) {
    this.node.parentNode.replaceChild(newNode.node, this.node);
  } else {
    this.node = newNode.node;
  }

  mount(newNode);
  return this;
};
