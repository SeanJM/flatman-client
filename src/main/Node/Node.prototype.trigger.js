Node.prototype.trigger = function () {
  var subscribers = this.subscribers;
  var names;
  var e;

  if (typeof arguments[0] === 'string') {
    names = arguments[0];
    e = arguments[1] || {};
  } else {
    names = arguments[0].type;
    e = arguments[0];
  }

  e.type = e.type || names;
  names = names.toLowerCase().split(',');

  if (!this.node.disabled) {
    names.forEach(function (name) {
      name = name.trim();
      if (name.length && subscribers[name]) {
        subscribers[name].forEach(function (callback) {
          callback.call(self, e);
        });
      }
    });
  }

  return this;
};
