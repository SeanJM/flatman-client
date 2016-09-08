CreateNode.prototype.before = function (target) {
  target = createEl(target);
  target.node.parentNode.insertBefore(this.node, target.node);
};
