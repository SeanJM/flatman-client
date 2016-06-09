CreateNode.prototype.contains = function (target) {
  if (target instanceof CreateNode) {
    return this._node_.contains(target._node_);
  }
  return this._node_.contains(target);
};
