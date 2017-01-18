Node.prototype.contains = function (maybeList) {
  var i = 1;
  var n = arguments.length;

  function each(node, a) {
    a = getNode(a);
    return node.contains(a) && a !== node;
  }

  if (Array.isArray(maybeList)) {
    for (var x = 0, y = maybeList.length; x < y; x++) {
      if (each(this.node, maybeList[x])) {
        return true;
      }
    }
  }

  return each(this.node, maybeList);
};
