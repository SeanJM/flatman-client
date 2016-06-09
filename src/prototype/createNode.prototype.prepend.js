CreateNode.prototype.prepend = function (node) {
  var children = this.children();
  if (children.length) {
    createNode(node).before(children[0]);
  } else {
    createNode(node).appendTo(this);
  }
};
