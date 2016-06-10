CreateNode.prototype.on = function (names, callback) {
  var self = this;

  forEach(names.split(',').map(trim).filter(hasLength), function (name) {
    if (typeof self.subscribers[name] === 'undefined') {
      self.subscribers[name] = [];
    }
    if (self.subscribers[name].indexOf(callback) === -1) {
      self.subscribers[name].push(callback);
      self.node.addEventListener(name, callback, false);
    }
  });
};
