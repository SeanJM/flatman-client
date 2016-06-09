CreateNode.prototype.replaceWith = function (newNode) {
  var withNode = newNode instanceof CreateNode ? newNode._node_ : newNode;

  if (this._node_.parentNode) {
    this._node_.parentNode.replaceChild(withNode, this._node_);
  }

  this._node_ = withNode;

  return this;
};
