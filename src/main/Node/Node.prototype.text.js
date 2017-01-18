Node.prototype.text = function (value) {
  if (typeof value !== 'undefined' && !(typeof value === 'boolean')) {
    this.node.textContent = value;
    return this;
  }
  return this.node.textContent.trim();
};
