Node.prototype.on = function (names, callback) {
  var self = this;

  function onWrap(name) {
    return function (event) {
      self.trigger(name, event);
    };
  }

  names = names.toLowerCase().split(',');

  for (var i = 0, n = names.length; i < n; i++) {
    names[i] = names[i].trim();

    if (names[i].length) {
      if (typeof this.subscribers[names[i]] === 'undefined') {
        this.subscribers[names[i]] = [];
      }

      if (this.subscribers[names[i]].indexOf(callback) === -1) {
        this.subscribers[names[i]].push(callback);

        if ((names[i] === 'load' || names[i] === 'error') && this.tagName === 'img') {
          this.node[names[i]] = onWrap(names[i]);
        } else {
          this.node.addEventListener(names[i], callback, true);
        }
      }
    }
  }

  return this;
};
