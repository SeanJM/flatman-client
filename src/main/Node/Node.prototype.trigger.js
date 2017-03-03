Node.prototype.trigger = function (names, props) {
  var subscribers = this.subscribers;
  names = names.toLowerCase().split(',');

  if (!this.node.disabled) {
    names.forEach(function (name) {
      name = name.trim();
      if (name.length && subscribers[name]) {
        subscribers[name].forEach(function (callback) {
          callback.call(self, props);
        });
      }
    });
  }

  return this;
};
