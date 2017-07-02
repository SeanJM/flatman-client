Node.prototype.hasParent = function (target) {
  var self = this;

  return Array.isArray(target)
    ? target.map(function (t) {
      return t.contains(self);
    })
    : target.contains(self);
};
