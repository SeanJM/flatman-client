CreateNode.prototype.children = function () {
  return [].filter.call(this._node_.childNodes, function (node) {
    return node.nodeType === 1;
  });
};
