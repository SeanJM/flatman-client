Node.prototype.trigger = function () {
  var names = arguments[0];
  var e = arguments[1];

  if (typeof arguments[0] === 'object') {
    names = arguments[0].type;
    e = arguments[0];
  }

  function trigger(self, callback) {
    callback.call(self, e);
  }

  if (e && typeof e.preventDefault === 'undefined') {
    e.defaultPrevented = false;
    e.preventDefault = function () {
      e.defaultPrevented = true;
    };
  }

  names = names.toLowerCase().split(',');

  if (typeof e === 'undefined') {
    e = { type : name, target : this.node };
  } else if (typeof e.type === 'undefined') {
    e.type = name;
  }

  if (!this.node.disabled) {
    for (var i = 0, n = names.length; i < n; i++) {
      names[i] = names[i].trim();
      if (names[i].length && this.subscribers[names[i]]) {
        for (var x = this.subscribers[names[i]].length - 1; x >= 0; x--) {
          trigger(this, this.subscribers[names[i]][x]);
        }
      }
    }
  }

  return this;
};
