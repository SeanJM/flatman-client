CreateNode.prototype.parent = function () {
  return new CreateNode(this._node_.parentNode);
};
