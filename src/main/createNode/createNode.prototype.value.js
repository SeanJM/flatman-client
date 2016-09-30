CreateNode.prototype.value = function (value) {
  if (typeof value !== 'undefined') {
    this.node.value = value;
    return this;
  }

  return this.node.value.trim();
};
