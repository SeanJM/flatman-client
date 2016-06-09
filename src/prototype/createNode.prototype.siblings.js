CreateNode.prototype.siblings = function () {
  return map(filter(node.parentNode.childNodes, isElement), createNode);
};
