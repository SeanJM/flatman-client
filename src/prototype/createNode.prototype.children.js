CreateNode.prototype.children = function () {
  return [].filter.call(this.node.childNodes, function (node) {
    return node.nodeType === 1;
  });
};
