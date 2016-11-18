CreateNode.prototype.appendTo = function (target) {
  appendChild(target, [this.node]);
  return this;
};
