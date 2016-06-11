CreateNode.prototype.style = function () {
  var i = 0;
  var n = arguments.length;
  var a = new Array(n);

  for (; i < n; i++) {
    a[i] = arguments[i];
  }

  setStyle.apply(null, [this.node].concat(a));

  return this;
};
