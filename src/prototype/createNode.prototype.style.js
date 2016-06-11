CreateNode.prototype.style = function (a, b) {
  if (isString(a) && isUndefined(b)) {
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

  setStyle(this.node, a, b);
  return this;
};
