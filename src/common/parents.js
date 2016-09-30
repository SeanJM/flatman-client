function parents(node) {
  var parents = [];
  var p = node.parentNode;
  var html = document.body.parentNode;

  while (p && p !== html) {
    parents.push(p);
    p = p.parentNode;
  }

  return parents;
}
