CreateNode.prototype.html = function (a) {
  if (typeof a !== 'undefined') {
    this.node.innerHTML = a;
  } else {
    return this.node.innerHTML;
  }
};
