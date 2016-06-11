CreateNode.prototype.value = function (value) {
  if (typeof value !== 'undefined') {
    this.node.value = value;
    return this;
  } else {
    return this.node.value;
  }
};
