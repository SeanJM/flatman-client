Node.prototype.before = function (children) {
  var f = document.createDocumentFragment();
  var parentNode = this.parentNode;
  var childNodes = parentNode.childNodes;

  function each(child) {
    var t = child.getNode();
    t.parentNode = parentNode;
    f.appendChild(t.node);
  }

  if (Array.isArray(children)) {
    for (var i = 0, n = children.length; i < n; i++) {
      each(children[i]);
    }
  } else {
    each(children);
  }

  this.node.parentNode.insertBefore(f, this.node);
  [].splice.apply(childNodes, [ childNodes.indexOf(this), 0].concat(children));
  [].forEach.call(f, mount);

  return this;
};
