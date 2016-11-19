CreateNode.prototype.before = function (children) {
  var f = document.createDocumentFragment();

  if (Array.isArray(children)) {
    for (var i = 0, n = children.length; i < n; i++) {
      f.append(getNode(children[i]));
    }
  } else if (!Array.isArray(children) || arguments.length > 1) {
    throw 'Before takes a single array as an argument';
  }

  this.node.parentNode.insertBefore(f, this.node);
  [].forEach.call(f, mount);

  return this;
};
