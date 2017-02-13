Node.prototype.scrollTop = function (a) {
  if (typeof a === 'undefined') {
    return this.node.scrollTop;
  }
  
  this.node.scrollTop = a;
  return this;
};
