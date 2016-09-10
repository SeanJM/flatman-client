CreateNode.prototype.prepend = function (node) {
  var children = this.children();
  node = createEl(node).node;
  if (children) {
    node.parentNode.insertBefore(children[0].node, node);
  } else {
    this.node.appendChild(node);
  }
};
