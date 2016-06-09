CreateNode.prototype.addClass = function (className) {
  var i = this._class_.indexOf(className);

  if (i === -1) {
    this._class_.push(className);
    this._class_.sort();
    this._node_.className = this._class_.join(' ');
  }

  return this;
};
