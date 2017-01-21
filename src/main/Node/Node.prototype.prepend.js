Node.prototype.prepend = function (children) {
  var i = 0;
  var n = children.length;

  if (!this.node.parentNode) {
    throw 'Cannot perform \'prepend\', node requires a parent';
  }

  if (Array.isArray(children)) {
    for (; i < n; i++) {
      children[i].parentNode = this;
      this.node.parentNode.insertBefore(children[i].getNode().node, this.node);
    }
    [].unshift.apply(this.childNodes, children.reverse());
  } else {
    throw 'prepend takes a single array as an argument';
  }
};
