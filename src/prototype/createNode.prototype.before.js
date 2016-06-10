CreateNode.prototype.before = function (maybeNode) {
  var node = this.node;
  var target = maybeNode instanceof CreateNode ? maybeNode._node_ : maybeNode;
  target.parentNode.insertBefore(node, target);
};
