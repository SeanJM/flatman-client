Node.prototype.html = function (a) {
  if (typeof a === 'undefined') {
    return this.node.innerHTML;
  }
  this.node.innerHTML = a;
  return this;
};
