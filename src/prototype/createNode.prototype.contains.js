CreateNode.prototype.contains = function () {
  var i = 0;
  var n = arguments.length;
  var self = this;
  var x;
  var y;

  function each(a) {
    if (a instanceof CreateNode) {
      if (!self.node.contains(a.node) || a.node === self.node) {
        return false;
      }
    } else if (!self.node.contains(a) || self.node === a) {
      return false;
    }
    return true;
  }

  for (; i < n; i++) {
    if (isArray(arguments[i])) {
      for (x = 0, y = arguments[i].length; x < y; x++) {
        if (!each(arguments[i][x])) {
          return false;
        }
      }
    } else {
      if (!each(arguments[i])) {
        return false;
      }
    }
  }

  return true;
};
