CreateNode.prototype.append = function () {
  var n = arguments.length;
  var i = 0;
  var args = [];

  for (; i < n; i++) {
    args.push(arguments[i]);
  }

  appendChild.apply(null, [this.node].concat(args));

  return this;
};
