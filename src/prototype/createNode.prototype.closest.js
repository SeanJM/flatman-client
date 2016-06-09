CreateNode.prototype.closest = function (selector) {
  return createNode(this._node_.closest(selector));
};
