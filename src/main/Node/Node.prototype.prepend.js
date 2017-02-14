Node.prototype.prepend = function (children) {
  var i = 0;
  var n = children.length;
  var f = document.createDocumentFragment();
  var childrenByNode = [];

  if (!this.node.parentNode) {
    throw 'Cannot perform \'prepend\', node requires a parent';
  }

  if (Array.isArray(children)) {
    for (; i < n; i++) {
      if (children[i]) {
        childrenByNode[i] = children[i].getNode
          ? children[i].getNode()
          : children[i];

        if (childrenByNode[i].node) {
          childrenByNode[i].parentNode = this;
          f.appendChild(childrenByNode[i].node);
        } else {
          childrenByNode[i] = new Text(childrenByNode[i]);
          f.appendChild(new Text(childrenByNode[i]));
        }
      }
    }

    this.node.parentNode.insertBefore(f, this.node);
    [].unshift.apply(this.childNodes, childrenByNode.reverse());
  } else {
    this.prepend([ children ]);
  }
};
