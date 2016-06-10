CreateNode.prototype.hasClass = function (className) {
  return this.node.className.split(' ').indexOf(className) !== -1;
};
