CreateNode.prototype.children = function () {
  var c = this.node.childNodes;
  return c.length ? map(filter(c, isElement), function (a) {
    return el(a);
  }) : false;
};
