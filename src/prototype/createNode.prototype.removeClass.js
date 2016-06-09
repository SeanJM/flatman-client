CreateNode.prototype.removeClass = function (className) {
  this._class_ = this._class_.filter(partial(not, className)).sort();
  this._node_.className = this._class_.join(' ');
  return this;
};
