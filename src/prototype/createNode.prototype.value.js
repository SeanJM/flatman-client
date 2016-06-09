CreateNode.prototype.value = function (value) {
  if (typeof value !== 'undefined') {
    this._node_.value = value;
  } else {
    return this._node_.value;
  }
};
