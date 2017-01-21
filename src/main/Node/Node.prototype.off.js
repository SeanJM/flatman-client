Node.prototype.off = function (names, callback) {
  var self = this;

  function each(name, callback) {
    var subscribers = self.subscribers[name];
    self.node.removeEventListener(name, callback);
    subscribers.splice(subscribers.indexOf(callback), 1);
  }

  names = names.toLowerCase().split(',');
  for (var i = 0, n = names.length; i < n; i++) {
    names[i] = names[i].trim();
    if (names[i].length && callback) {
      each(names[i], callback);
    } else while (this.subscribers[names[i]].length) {
      each(names[i], this.subscribers[names[i]][0]);
    }
  }
  return this;
};
