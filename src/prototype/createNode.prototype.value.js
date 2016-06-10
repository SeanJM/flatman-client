CreateNode.prototype.value = function (value) {
  if (typeof value !== 'undefined') {
    this.node.value = value;
  } else {
    return this.node.value;
  }
};
