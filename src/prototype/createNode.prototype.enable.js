CreateNode.prototype.enable = function () {
  this._node_.removeAttribute('disabled');
  return this;
};
