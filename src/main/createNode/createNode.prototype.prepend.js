CreateNode.prototype.prepend = function (node) {
  var children = this.node.childNodes;
  node = node.node || node;
  if (children.length) {
    this.node.insertBefore(node, children[0]);
  } else {
    this.node.appendChild(node);
  }
};
