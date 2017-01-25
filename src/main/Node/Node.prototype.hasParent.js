Node.prototype.hasParent = function (target) {
  var node = this.node;

  function contains(t) {
    return (t.getNode ? t.getNode().node : t).contains(node);
  }

  if (Array.isArray(target)) {
    return target.map(contains);
  }

  return contains(target);
};
