CreateNode.prototype.children = function () {
  return filter(this.node.childNodes, isElement);
};
