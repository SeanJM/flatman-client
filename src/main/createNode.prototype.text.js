CreateNode.prototype.text = function (value) {
  if (isDefined(value) && !isBoolean(value)) {
    this.node.textContent = value;
    return this;
  }
  return this.node.textContent.trim();
};
