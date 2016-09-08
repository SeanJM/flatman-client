CreateNode.prototype.firstChild = function () {
  return createEl(filter(this.node.childNodes, isElement)[0]);
};
