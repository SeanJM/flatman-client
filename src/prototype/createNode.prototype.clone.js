CreateNode.prototype.clone = function () {
  return createNode(this._node_.cloneNode(true));
};
