CreateNode.prototype.trigger = function (names, e) {
  var self = this;
  var nameList = names.split(',').map(trim).filter(hasLength);

  if (typeof e === 'undefined') {
    e = { type : name, target : this._node_ };
  } else if (typeof e.type === 'undefined') {
    e.type = name;
  }

  if (!self._node_.disabled) {
    forEach(nameList, function (name) {
      forEach(self._subscribers_[name], function (callback) {
        callback(e);
      });
    });
  }
};
