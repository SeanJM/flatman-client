CreateNode.prototype.text = function (value) {
  if (typeof value === 'string') {
    this.node.innerHTML = value;
  } else {
    return this.node.innerHTML;
  }

  return this;
};
