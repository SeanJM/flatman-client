CreateNode.prototype.remove = function () {
  if (isElement(this._node_.parentNode)) {
    this._node_.parentNode.removeChild(this._node_);
  }
  return this;
};
