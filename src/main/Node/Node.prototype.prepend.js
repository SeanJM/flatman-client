Node.prototype.prepend = function (children) {
  var fragment = document.createDocumentFragment();
  var childNodes = this.childNodes;
  var self = this;

  function each(child) {
    child.parentNode = self;
    fragment.appendChild(child.node);
  }

  if (Array.isArray(children)) {
    for (var i = 0, n = children.length; i < n; i++) {
      each(children[i]);
    }
  } else {
    each(children);
  }

  [].splice.apply(
    childNodes, [
      childNodes.indexOf(childNodes[0]),
      0
    ].concat(children)
  );

  if (childNodes.length) {
    this.node.insertBefore(fragment, this.node.childNodes[0]);
  } else {
    this.node.appendChild(fragment);
  }

  [].forEach.call(fragment, mount);

  return this;
};
