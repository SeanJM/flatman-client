Node.prototype.text = function (value) {
  if (isDefined(value) && !(typeof value === 'boolean')) {
    this.node.textContent = value;
    return this;
  }
  return this.node.textContent.trim();
};
