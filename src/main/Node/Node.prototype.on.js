function onWrap(self, name) {
  return function (event) {
    self.trigger(name, event);
  };
}

Node.prototype.on = function (names, callback) {
  names = names.toLowerCase().split(',');

  for (var i = 0, n = names.length; i < n; i++) {
    names[i] = names[i].trim();
    if (names[i].length) {
      if ((names[i] === 'load' || names[i] === 'error') && this.tagName === 'img') {
        this.node[names[i]] = onWrap(this, names[i]);
      } else {
        this.subscribers[names[i]] = (this.subscribers[names[i]] || []).concat(callback);
        this.node.addEventListener(names[i], callback);
      }
    }
  }

  return this;
};
