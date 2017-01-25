Node.prototype.mapChildren = function () {
  function getRel(elNode) {
    [].forEach.call(elNode.node.childNodes, function (node) {
      var childElNode;
      if (isElement(node)) {
        childElNode = el(node);
        elNode.childNodes.push(childElNode);
        childElNode.parentNode = elNode;
        getRel(childElNode);
      }
    });
  }
  getRel(this);
  return this;
};
