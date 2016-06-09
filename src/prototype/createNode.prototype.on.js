CreateNode.prototype.on = function (names, callback) {
  var self = this;

  forEach(names.split(',').map(trim).filter(hasLength), function (name) {
    if (typeof self._subscribers_[name] === 'undefined') {
      self._subscribers_[name] = [];
    }
    if (self._subscribers_[name].indexOf(callback) === -1) {
      self._subscribers_[name].push(callback);
      self._node_.addEventListener(name, callback, false);
    }
  });
};
