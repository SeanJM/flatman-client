Node.prototype.before = function (children) {
  var f = document.createDocumentFragment();
  var childNodes = this.parentNode.childNodes;

  if (Array.isArray(children)) {
    for (var i = 0, n = children.length; i < n; i++) {
      f.appendChild(getNode(children[i]));
    }
  } else if (!Array.isArray(children) || arguments.length > 1) {
    throw 'Before takes a single array as an argument';
  }

  this.node.parentNode.insertBefore(f, this.node);
  [].splice.apply(childNodes, [ childNodes.indexOf(this), 0].concat(children));
  [].forEach.call(f, mount);

  return this;
};
