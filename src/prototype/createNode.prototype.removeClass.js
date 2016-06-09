CreateNode.prototype.removeClass = function (a) {
  this._node_.className = filter(map(this._node_.className.split(' '), trim), function (b) {
    return hasLength(b) && not(a, b);
  }).sort().join(' ');
  return this;
};
