CreateNode.prototype.parents = function () {
  var parents = [];
  var p = this.node.parentNode;
  var html = document.body.parentNode;
  
  while (p && p !== html) {
    parents.unshift(el(p));
    p = p.parentNode;
  }

  return parents;
};
