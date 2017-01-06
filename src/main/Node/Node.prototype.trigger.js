Node.prototype.trigger = function () {
  var subscribers = this.subscribers;
  var names;
  var eventOpt;
  var callbacks;

  function preventDefault() {
    eventOpt.defaultPrevented = true;
  }

  if (typeof arguments[0] === 'string') {
    names = arguments[0];
    eventOpt = arguments[1] || {};
  } else {
    names = arguments[0].type;
    eventOpt = arguments[0];
  }

  if (typeof eventOpt.preventDefault === 'undefined') {
    eventOpt.defaultPrevented = false;
    eventOpt.preventDefault = preventDefault;
  }

  eventOpt.type = eventOpt.type || names;
  eventOpt.target = eventOpt.target || this.node;
  names = names.toLowerCase().split(',');

  if (!this.node.disabled && subscribers) {
    names.forEach(function (name) {
      name = name.trim();

      if (subscribers[name]) {
        subscribers[name]
          .slice()
          .forEach(function (callback) {
            callback.call(self, eventOpt);
          });
      }

    });
  }

  return this;
};
