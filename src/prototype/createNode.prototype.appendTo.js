CreateNode.prototype.appendTo = function (target) {
  if (target instanceof CreateNode) {
    target.append(this);
  } else if (isNode(target)) {
    target.appendChild(this.node);
  } else if (typeof target === 'string') {
    document.querySelector(target).appendChild(this.node);
  }

  return this;
};
