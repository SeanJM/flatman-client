CreateNode.prototype.appendTo = function (target) {
  if (target instanceof CreateNode) {
    target.append(this);
  } else if (isNode(target)) {
    target.appendChild(this._node_);
  } else if (typeof target === 'string') {
    document.querySelector(target).appendChild(this._node_);
  }

  return this;
};
