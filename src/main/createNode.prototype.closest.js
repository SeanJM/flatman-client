CreateNode.prototype.closest = function (selector) {
  var c = this.node.closest(selector);
  return c !== null ? createEl(c) : false;
};
