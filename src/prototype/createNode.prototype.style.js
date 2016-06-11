CreateNode.prototype.style = function () {
  var n = arguments.length;
  var i;
  var a;
  var c;

  if (n === 1 && isString(arguments[0])) {
    if (document.body.contains(this.node)) {
      return window.getComputedStyle(this.node)[arguments[0]];
    } else {
      c = this.node.cloneNode(true);
      c.style.position = 'absolute';
      c.style.left = '-10000000';
      document.body.appendChild(c);
      a = window.getComputedStyle(c)[arguments[0]];
      c.parentNode.removeChild(c);
      c = undefined;
      return a;
    }
  }

  a = new Array(n);
  i = 0;

  for (; i < n; i++) {
    a[i] = arguments[i];
  }

  setStyle.apply(null, [this.node].concat(a));
  return this;
};
