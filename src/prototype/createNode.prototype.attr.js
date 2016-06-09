CreateNode.prototype.attr = function (property, value) {
  if (typeof property === 'undefined') {
    return this._node_.attributes;
  }

  if (typeof value === 'undefined') {
    return this._node_.getAttribute(property);
  }

  this._node_.setAttribute(property, value);

  return this;
};
