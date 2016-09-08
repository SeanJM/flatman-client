CreateNode.prototype.text = function (value) {
  if (isDefined(value) && !isBoolean(value)) {
    this.node.textContent = value;
    return this;
  }
  return trim(this.node.textContent);
};
