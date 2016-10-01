CreateNode.prototype.appendTo = function (target) {
  var target = typeof target === 'string'
    ? document.querySelector(target)
    : target;

  appendChild(target, this.node);

  return this;
};
