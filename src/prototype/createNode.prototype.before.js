CreateNode.prototype.before = function (maybeNode) {
  var node = this._node_;
  var target = maybeNode instanceof CreateNode ? maybeNode._node_ : maybeNode;
  target.parentNode.insertBefore(node, target);
};
