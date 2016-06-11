CreateNode.prototype.prepend = function (node) {
  var children = this.children();
  if (children) {
    createNode(node).before(children[0]);
  } else {
    createNode(node).appendTo(this);
  }
};
