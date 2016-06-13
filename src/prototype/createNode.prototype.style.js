CreateNode.prototype.style = function (a, b) {

  /* The Problem
   * (A) node.style('property');
   * (B) node.style('property: value;');
   * (C) node.style({ property : value });
   * (D) node.style('property', 'value');
   */
  if (isString(a) && isUndefined(b)) {
    // Solve for (A)
    if (a.indexOf(':') === -1) {
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
    } else {
      // Solve for (B)
      this.node.setAttribute('style', a);
      return this;
    }
  }

  // Solve for (C) && (D)
  setStyle(this.node, a, b);
  return this;
};
