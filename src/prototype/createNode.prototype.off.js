CreateNode.prototype.off = function (names, callback) {
  var self = this;

  names.split(',').map(trim).filter(hasLength).forEach(function (name) {
    var subscribers = self.subscribers;

    if (isFunction(callback)) {
      subscribers[name] = subscribers[name].filter(partial(not, callback));
      self.node.removeEventListener(name, callback, false);
    } else {
      while (subscribers[name].length) {
        self.node.removeEventListener(name, subscribers[name][0], false);
        subscribers[name].shift();
      }
    }
  });

  return this;
};
