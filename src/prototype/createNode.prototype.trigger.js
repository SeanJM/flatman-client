CreateNode.prototype.trigger = function (names, e) {
  function trigger(callback) {
    callback(e);
  }

  if (typeof e.preventDefault === 'undefined') {
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
        for (var x = 0, y = this.subscribers[names[i]].length; x < y; x++) {
          trigger(this.subscribers[names[i]][x]);
        }
      }
    }
  }
};
