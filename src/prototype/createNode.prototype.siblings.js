CreateNode.prototype.siblings = function () {
  var children = this._node_.parentNode.childNodes;
  return map(filter(children, isElement), function (s) {
    return createNode(s);
  });
};
