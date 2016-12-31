Node.prototype.contains = function () {
  var a = [];
  var i = 0;
  var n = arguments.length;

  for (; i < n; i++) {
    a.push(arguments[i]);
  }

  return contains.apply(null, [this.node].concat(a));
};
