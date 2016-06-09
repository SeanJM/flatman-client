CreateNode.prototype.parents = function () {
  var parents = [];
  var p = this._node_.parent;

  while (p) {
    parents.push(p);
    p = this._node_.parent;
  }

  return parents;
};
