CreateNode.prototype.before = function (target) {
  target = createNode(target);
  target.node.parentNode.insertBefore(this.node, target.node);
};
