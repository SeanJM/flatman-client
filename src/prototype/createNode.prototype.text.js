CreateNode.prototype.text = function (value) {
  if (isDefined(value)) {
    this.node.innerHTML = value;
  } else {
    return this.node.innerHTML;
  }

  return this;
};
