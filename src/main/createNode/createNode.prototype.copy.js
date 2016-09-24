CreateNode.prototype.copy = function (node) {
  var elNode = el(node);
  var opt = elNode.attr();

  for(var k in opt) {
    this.attr(k, opt[k]);
  }

  this.html(elNode.html());

  return this;
};
