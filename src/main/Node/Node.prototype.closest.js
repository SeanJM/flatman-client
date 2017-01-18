Node.prototype.closest = function (selector) {
  var p = this.node.parentNode;
  var temp;

  while (p) {
    temp = el(p);
    if (temp.is(selector)) {
      return temp;
    }
    p = p.parentNode;
  }

  return false;
};
