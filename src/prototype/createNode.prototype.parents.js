CreateNode.prototype.parents = function () {
  var parents = [];
  var p = this.node.parentNode;

  while (p) {
    parents.unshift(el(p));
    p = p.parentNode;
  }

  return parents;
};
