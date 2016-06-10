CreateNode.prototype.trigger = function (names, e) {
  var self = this;
  var nameList = names.split(',').map(trim).filter(hasLength);

  if (typeof e === 'undefined') {
    e = { type : name, target : this.node };
  } else if (typeof e.type === 'undefined') {
    e.type = name;
  }

  if (!self.node.disabled) {
    forEach(nameList, function (name) {
      forEach(self.subscribers[name], function (callback) {
        callback(e);
      });
    });
  }
};
