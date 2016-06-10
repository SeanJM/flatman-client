CreateNode.fn = function (name, callback) {
  CreateNode.prototype[name] = callback;
};
