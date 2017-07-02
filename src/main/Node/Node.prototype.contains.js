Node.prototype.contains = function (a) {
  if (Array.isArray(a)) {
    for (var x = 0, y = a.length; x < y; x++) {
      if (this.node.contains(a[x].node) && a[x].node !== this.node) {
        return true;
      }
    }
  }

  return this.node.contains(a.node);
};
