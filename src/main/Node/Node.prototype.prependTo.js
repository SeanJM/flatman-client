Node.prototype.prependTo = function (target) {
  var element = target.getNode();
  var children = element.node.childNodes;

  if (children.length) {
    element.node.insertBefore(this.node, children[0]);
  } else {
    element.node.appendChild(this.node);
  }

  element.childNodes.unshift(this);
  return this;
};
