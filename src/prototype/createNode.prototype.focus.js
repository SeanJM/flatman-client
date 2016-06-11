CreateNode.prototype.focus = function () {
  if (!this.node.getAttribute('tabindex')) {
    this.node.setAttribute('tabindex', '0');
  }

  this.node.focus();

  return this;
};
