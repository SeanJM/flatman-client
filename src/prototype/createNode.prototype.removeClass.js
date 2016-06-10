CreateNode.prototype.removeClass = function (a) {
  this.node.className = filter(map(this.node.className.split(' '), trim), function (b) {
    return hasLength(b) && not(a, b);
  }).sort().join(' ');
  return this;
};
