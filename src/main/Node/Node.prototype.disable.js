Node.prototype.disable = function () {
  this.node.setAttribute('disabled', 'disabled');
  return this;
};
