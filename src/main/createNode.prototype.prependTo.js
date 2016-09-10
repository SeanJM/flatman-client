CreateNode.prototype.prependTo = function (target) {
  var children = createEl(target).children();
  if (children.length) {
    this.prepend(children[0]);
  } else {
    this.appendTo(target);
  }
};
