Node.fn = function (name, callback) {
  Node.prototype[name] = callback;
};
