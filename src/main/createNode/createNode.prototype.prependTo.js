CreateNode.prototype.prependTo = function (target) {
  var node = target.node || target;
  var children = node.childNodes;
  if (children.length) {
    node.insertBefore(this.node, children[0]);
  } else {
    node.appendChild(this.node);
  }
};
