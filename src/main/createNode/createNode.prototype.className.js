CreateNode.prototype.className = function (value) {
  if (typeof value === 'undefined') {
    return this.node.getAttribute('class') || '';
  }
  this.node.setAttribute('class', value);
  return this;
};
