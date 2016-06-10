CreateNode.prototype.parents = function () {
  var parents = [];
  var p = this.node.parentNode;

  while (p) {
    parents.unshift(p);
    p = p.parentNode;
  }

  return parents;
};
