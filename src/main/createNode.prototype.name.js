CreateNode.prototype.name = function (value) {
  if (typeof value !== 'undefined') {
    this.node.setAttribute('name', value);
    return this;
  }
  return this.node.getAttribute('name');
};
