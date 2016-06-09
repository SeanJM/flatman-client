CreateNode.prototype.hasClass = function (className) {
  return this._node_.className.split(' ').indexOf(className) !== -1;
};
