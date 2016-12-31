Node.prototype.on = function (names, callback) {
  names = names.toLowerCase().split(',');

  for (var i = 0, n = names.length; i < n; i++) {
    names[i] = names[i].trim();

    if (names[i].length) {
      if (typeof this.subscribers[names[i]] === 'undefined') {
        this.subscribers[names[i]] = [];
      }

      if (this.subscribers[names[i]].indexOf(callback) === -1) {
        this.subscribers[names[i]].push(callback);
        this.node.addEventListener(names[i], callback, false);
      }
    }
  }

  return this;
};
