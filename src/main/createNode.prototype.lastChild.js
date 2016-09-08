CreateNode.prototype.lastChild = function () {
  return createEl(filter(this.node.childNodes, isElement).slice(-1)[0]);
};
