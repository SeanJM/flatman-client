Node.prototype.remove = function () {
  var onBody = this.hasParent(BODY);
  var pChildNodes = this.parentNode.childNodes;

  this.node.parentNode.removeChild(this.node);
  pChildNodes.splice(pChildNodes.indexOf(this), 1);

  if (onBody) {
    unmount(this);
  }

  return this;
};
