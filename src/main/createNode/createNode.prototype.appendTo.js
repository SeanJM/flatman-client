CreateNode.prototype.appendTo = function (target) {
  if (typeof target === 'string') {
    document.querySelector(target).appendChild(this.node);
  } else {
    getNode(target).appendChild(this.node);
  }

  return this;
};
