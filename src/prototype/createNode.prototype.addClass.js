CreateNode.prototype.addClass = function (a) {
  var className = filter(map(this._node_.className.split(' '), trim), hasLength);
  var i = className.indexOf(a);

  if (i === -1) {
    className.push(a);
    className.sort();
    this._node_.className = className.join(' ');
  }

  return this;
};
