CreateNode.prototype.before = function () {
  var f = document.createDocumentFragment();

  if (Array.isArray(arguments[0])) {
    for (var i = 0, n = arguments[0].length; i < n; i++) {
      f.append(getNode(arguments[i]));
    }
  } else {
    f.append(getNode(arguments[0]));
  }

  this.node.parentNode.insertBefore(f, this.node);
  [].forEach.call(f, mount);

  return this;
};
