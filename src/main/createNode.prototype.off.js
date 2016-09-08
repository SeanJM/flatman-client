CreateNode.prototype.off = function (names, callback) {
  var self = this;

  names = names.toLowerCase().split(',');

  for (var i = 0, n = names.length; i < n; i++) {
    names[i] = names[i].trim();

    if (names[i].length) {
      if (typeof callback === 'function') {
        self.subscribers[names[i]] = self.subscribers[names[i]].filter(partial(not, callback));
        self.node.removeEventListener(names[i], callback, false);
      } else {
        while (self.subscribers[names[i]].length) {
          self.node.removeEventListener(names[i], self.subscribers[names[i]][0], false);
          self.subscribers[names[i]].shift();
        }
      }
    }
  }

  return this;
};
