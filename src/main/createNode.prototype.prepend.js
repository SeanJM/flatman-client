CreateNode.prototype.prepend = function (node) {
  var children = this.children();
  if (children) {
    createEl(node).before(children[0]);
  } else {
    createEl(node).appendTo(this);
  }
};
