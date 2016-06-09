CreateNode.prototype.remove = function () {
  this._node_.parentNode.removeChild(this._node_);
  return this;
};
