CreateNode.prototype.prepend = function (children) {
  var i = 0;
  var n = children.length;

  if (!this.node.parentNode) {
    throw 'Cannot perform \'prepend\', node requires a parent';
  }

  if (Array.isArray(children)) {
    for (; i < n; i++) {
      this.node.parentNode.insertBefore(getNode(children[i]), this.node);
    }
  } else {
    throw 'prepend takes a single array as an argument';
  }
};
