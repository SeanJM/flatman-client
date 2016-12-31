Node.prototype.isFocused = function () {
  return document.activeElement === this.node;
};
