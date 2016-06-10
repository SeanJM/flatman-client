CreateNode.prototype.firstChild = function () {
  return createNode(filter(this.node.childNodes, isElement)[0]);
};
