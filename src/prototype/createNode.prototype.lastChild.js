CreateNode.prototype.lastChild = function () {
  return createNode(filter(this.node.childNodes, isElement).slice(-1)[0]);
};
