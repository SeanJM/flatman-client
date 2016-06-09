CreateNode.prototype.src = function (value) {
  if (typeof value === 'string') {
    this._node_.setAttribute('src', value);
  } else {
    return this._node_.getAttribute('src');
  }

  return this;
};
