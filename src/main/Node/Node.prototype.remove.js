Node.prototype.remove = function () {
  var isOnBody = document.body.contains(this.node);
  var siblings = this.parentNode && this.parentNode.childNodes;

  if (this.node.parentNode) {
    this.node.parentNode
      .removeChild(this.node);

    siblings
      .splice(siblings.indexOf(this), 1);
  }

  if (isOnBody) {
    unmount(this);
  }

  return this;
};
