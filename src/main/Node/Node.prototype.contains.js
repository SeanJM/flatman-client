Node.prototype.contains = function (maybeList) {
  function contains(node, a) {
    a = getNode(a);
    return node.contains(a) && a !== node;
  }

  if (Array.isArray(maybeList)) {
    for (var x = 0, y = maybeList.length; x < y; x++) {
      if (contains(this.node, maybeList[x])) {
        return true;
      }
    }
  }

  return contains(this.node, maybeList);
};
