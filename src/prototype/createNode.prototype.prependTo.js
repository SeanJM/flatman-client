CreateNode.prototype.prependTo = function (target) {
  var children = createNode(target).children();
  if (children.length) {
    this.before(children[0]);
  } else {
    this.appendTo(target);
  }
};
