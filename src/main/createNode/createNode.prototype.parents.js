CreateNode.prototype.parents = function () {
  return parents(this.node).map(function (a) {
    return el(a);
  });
};
