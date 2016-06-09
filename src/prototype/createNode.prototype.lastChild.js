CreateNode.prototype.lastChild = function () {
  return createNode(filter(this.children(), isElement).slice(-1)[0]);
};
