CreateNode.prototype.once = function (names, callback) {
  var self = this;

  var ref = function (e) {
    callback(e);
    self.off(names, ref);
  };

  this.on(names, ref);

  return this;
};
