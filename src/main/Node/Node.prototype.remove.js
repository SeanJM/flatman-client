Node.prototype.remove = function () {
  var onBody = this.hasParent(BODY);
  var siblings = this.parentNode && this.parentNode.childNodes;

  if (this.node.parentNode) {
    this.node.parentNode
      .removeChild(this.node);

    siblings
      .splice(siblings.indexOf(this), 1);
  }

  if (onBody) {
    unmount(this);
  }

  return this;
};
