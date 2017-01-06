Node.prototype.remove = function () {
  var onBody = this.hasParent(BODY);
  var index = -1;

  if (this.parentNode) {
    index = this.parentNode.childNodes.indexOf(this);
    this.parentNode.childNodes.splice(index, 1);
    getNode(this.parentNode).removeChild(getNode(this));
    this.parentNode = undefined;
    this.trigger('remove');
  }

  if (onBody) {
    unmount(this);
  }


  return this;
};
