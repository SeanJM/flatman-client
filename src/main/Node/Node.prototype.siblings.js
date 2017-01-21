Node.prototype.siblings = function () {
  var children = this.node.parentNode ? this.node.parentNode.childNodes : [];
  var siblings = [];

  for (var i = 0, n = children.length; i < n; i++) {
    if (isElement(children[i])) {
      siblings.push(el(children[i]));
    }
  }

  return siblings;
};
