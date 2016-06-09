CreateNode.prototype.firstChild = function () {
  return createNode(filter(this.children(), isElement)[0]);
};
