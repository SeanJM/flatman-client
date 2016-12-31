Node.prototype.closest = function (selector) {
  var c;

  if (typeof this.node.closest === 'function') {
    c = this.node.closest(selector);
  } else {
    c = closest(this.node, selector);
  }

  return c
    ? el(c)
    : false;
};
