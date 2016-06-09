CreateNode.prototype.text = function (value) {
  if (typeof value === 'string') {
    this._node_.innerHTML = value;
  } else {
    return this._node_.innerHTML;
  }

  return this;
};
