CreateNode.prototype.parents = function () {
  var parents = [];
  var p = this.node.parent;

  while (p) {
    parents.push(p);
    p = this.node.parent;
  }

  return parents;
};
