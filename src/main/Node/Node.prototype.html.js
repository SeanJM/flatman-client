Node.prototype.html = function (a) {
  if (typeof a === 'undefined') {
    return this.node.innerHTML;
  } else if (a.length === 0) {
    this.childNodes = [];
  }

  this.node.innerHTML = a;
  return this;
};
