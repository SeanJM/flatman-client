Node.prototype.prependTo = function (target) {
  var children = target.node.childNodes;

  if (children.length) {
    target.node.insertBefore(this.node, children[0]);
  } else {
    target.node.appendChild(this.node);
  }

  target.childNodes.unshift(this);
  return this;
};
