Node.prototype.copy = function (node) {
  var elNode = el(node);
  this.attr(elNode.attr());
  this.html(elNode.html());
  return this;
};
