Node.prototype.contains = function (a) {
  if (Array.isArray(a)) {
    for (var i = 0, y = a.length; i < y; i++) {
      if (this.node.contains(a[i].node) && a[i].node !== this.node) {
        return true;
      }
    }
  }

  return this.node.contains(a.node);
};
