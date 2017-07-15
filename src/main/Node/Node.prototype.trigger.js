Node.prototype.trigger = function (names, props) {
  var self = this;
  var subscribers = this.subscribers;
  names = names.toLowerCase().split(',');

  if (!this.node.disabled) {
    for (var i = 0, n = names.length; i < n; i++) {
      name = names[i].trim();
      if (name.length && subscribers[name]) {
        for (var x = 0, y = subscribers[name].length; x < y; x++) {
          subscribers[name][x].call(self, props);
        }
      }
    }
  }

  return this;
};
