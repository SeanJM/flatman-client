Node.prototype.contains = function (maybeList) {
  function contains(node, a) {
    a = a.getNode().node;
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
