CreateNode.prototype.before = function (maybeNode) {
  var node = this.node;
  var target = maybeNode instanceof CreateNode ? maybeNode.node : maybeNode;
  target.parentNode.insertBefore(node, target);
};
