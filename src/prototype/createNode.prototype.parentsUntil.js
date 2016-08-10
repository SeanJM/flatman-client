CreateNode.prototype.parentsUntil = function (predicate) {
  var p = this.node.parentNode;
  var html = document.body.parentNode;

  while (p && p !== html) {
    if (predicate(p)) {
      return createEl(p);
    }
    p = p.parentNode;
  }

  return false;
};
