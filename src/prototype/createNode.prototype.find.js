CreateNode.prototype.find = function (selector) {
  return [].map.call(this._node_.querySelectorAll(selector), function (node) {
    return new CreateNode(node);
  });
};
